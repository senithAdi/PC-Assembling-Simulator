-- ============================================================================
-- DATABASE SCHEMA: Intelligent Web-Based PC Assembling Simulator
-- Target Relational Database: PostgreSQL
-- ============================================================================

-- Enable UUID extension for unique identifiers if required, or use serial ids
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ----------------------------------------------------------------------------
-- 1. Users Table
-- Stores student profiles, authentication credentials, and gamification state
-- ----------------------------------------------------------------------------
CREATE TABLE Users (
    user_id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    level INT DEFAULT 1 NOT NULL,
    xp INT DEFAULT 0 NOT NULL,
    total_points INT DEFAULT 0 NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL
);

-- ----------------------------------------------------------------------------
-- 2. Components Table
-- Registry of PC hardware components with comprehensive technical specifications
-- ----------------------------------------------------------------------------
CREATE TABLE Components (
    component_id SERIAL PRIMARY KEY,
    component_name VARCHAR(100) NOT NULL,
    category VARCHAR(50) NOT NULL, -- CPU, GPU, RAM, PSU, Motherboard, etc.
    image_url VARCHAR(255),
    description TEXT NOT NULL,
    educational_content TEXT,
    manufacturer VARCHAR(50) NOT NULL,
    model VARCHAR(50) NOT NULL,
    power_draw INT DEFAULT 0,      -- in Watts
    socket VARCHAR(50),            -- e.g., LGA1700, AM5
    chipset VARCHAR(50),           -- e.g., Z790, B650
    ram_type VARCHAR(20),          -- e.g., DDR4, DDR5
    pcie_version VARCHAR(10),      -- e.g., PCIe 4.0, PCIe 5.0
    sata_ports INT DEFAULT 0,
    m2_slots INT DEFAULT 0,
    wattage INT DEFAULT 0,         -- PSU wattage capacity
    form_factor VARCHAR(50),       -- e.g., ATX, Micro-ATX, Mini-ITX
    dimensions VARCHAR(100),       -- Dimensions or Clearance parameters
    difficulty_level VARCHAR(20) DEFAULT 'Beginner' NOT NULL -- Beginner, Intermediate, Expert
);

-- ----------------------------------------------------------------------------
-- 3. CompatibilityRules Table
-- Declarative rules checked by the compatibility validation engine
-- ----------------------------------------------------------------------------
CREATE TABLE CompatibilityRules (
    rule_id SERIAL PRIMARY KEY,
    source_component_type VARCHAR(50) NOT NULL,
    target_component_type VARCHAR(50) NOT NULL,
    rule_name VARCHAR(100) NOT NULL,
    comparison_operator VARCHAR(20) NOT NULL, -- e.g., '=', '<=', '>=', 'contains'
    expected_value VARCHAR(100) NOT NULL,
    error_message TEXT NOT NULL,
    educational_explanation TEXT NOT NULL
);

-- ----------------------------------------------------------------------------
-- 4. ComponentCompatibility Table
-- Matrix defining binary compatibility relationships between specific components
-- ----------------------------------------------------------------------------
CREATE TABLE ComponentCompatibility (
    compatibility_id SERIAL PRIMARY KEY,
    component_a_id INT REFERENCES Components(component_id) ON DELETE CASCADE,
    component_b_id INT REFERENCES Components(component_id) ON DELETE CASCADE,
    compatible BOOLEAN NOT NULL DEFAULT TRUE,
    notes TEXT,
    CONSTRAINT unique_component_compatibility UNIQUE (component_a_id, component_b_id)
);

-- ----------------------------------------------------------------------------
-- 5. Scenarios Table
-- Educational build exercises (e.g. Budget Office PC, Gaming Setup)
-- ----------------------------------------------------------------------------
CREATE TABLE Scenarios (
    scenario_id SERIAL PRIMARY KEY,
    title VARCHAR(100) NOT NULL,
    description TEXT NOT NULL,
    target_build VARCHAR(100) NOT NULL,
    difficulty VARCHAR(20) DEFAULT 'Beginner' NOT NULL,
    recommended_components TEXT -- JSON or delimited list of ideal options
);

-- ----------------------------------------------------------------------------
-- 6. Builds Table
-- Completed or in-progress simulator builds created by users
-- ----------------------------------------------------------------------------
CREATE TABLE Builds (
    build_id SERIAL PRIMARY KEY,
    user_id INT REFERENCES Users(user_id) ON DELETE CASCADE,
    build_name VARCHAR(100) NOT NULL,
    scenario_id INT REFERENCES Scenarios(scenario_id) ON DELETE SET NULL,
    completion_status VARCHAR(20) DEFAULT 'In Progress' NOT NULL, -- In Progress, Complete
    score INT DEFAULT 0 NOT NULL,
    completion_time INT, -- in seconds
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL
);

-- ----------------------------------------------------------------------------
-- 7. BuildComponents Table
-- Junction table detailing components added to a specific motherboard/case build
-- ----------------------------------------------------------------------------
CREATE TABLE BuildComponents (
    build_component_id SERIAL PRIMARY KEY,
    build_id INT REFERENCES Builds(build_id) ON DELETE CASCADE,
    component_id INT REFERENCES Components(component_id) ON DELETE CASCADE,
    motherboard_slot VARCHAR(50) NOT NULL, -- target slot e.g. CPU Socket, RAM Slot 1
    installed_order INT NOT NULL,
    correctly_installed BOOLEAN DEFAULT TRUE NOT NULL
);

-- ----------------------------------------------------------------------------
-- 8. Achievements Table
-- Milestones that students can unlock by building PCs without mistakes
-- ----------------------------------------------------------------------------
CREATE TABLE Achievements (
    achievement_id SERIAL PRIMARY KEY,
    title VARCHAR(100) NOT NULL UNIQUE,
    description TEXT NOT NULL,
    xp_reward INT DEFAULT 0 NOT NULL,
    badge_image VARCHAR(255)
);

-- ----------------------------------------------------------------------------
-- 9. UserAchievements Table
-- Tracks which achievements have been unlocked by each user
-- ----------------------------------------------------------------------------
CREATE TABLE UserAchievements (
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES Users(user_id) ON DELETE CASCADE,
    achievement_id INT REFERENCES Achievements(achievement_id) ON DELETE CASCADE,
    unlocked_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL,
    CONSTRAINT unique_user_achievement UNIQUE (user_id, achievement_id)
);

-- ----------------------------------------------------------------------------
-- 10. Quizzes Table
-- Educational quiz questions associated with specific hardware parts
-- ----------------------------------------------------------------------------
CREATE TABLE Quizzes (
    quiz_id SERIAL PRIMARY KEY,
    component_category VARCHAR(50) NOT NULL, -- e.g., CPU, GPU, RAM
    question TEXT NOT NULL,
    option_a VARCHAR(255) NOT NULL,
    option_b VARCHAR(255) NOT NULL,
    option_c VARCHAR(255) NOT NULL,
    option_d VARCHAR(255) NOT NULL,
    correct_answer CHAR(1) NOT NULL, -- 'A', 'B', 'C', or 'D'
    explanation TEXT NOT NULL
);

-- ----------------------------------------------------------------------------
-- 11. QuizResults Table
-- Tracks quiz answers and scores of students
-- ----------------------------------------------------------------------------
CREATE TABLE QuizResults (
    result_id SERIAL PRIMARY KEY,
    user_id INT REFERENCES Users(user_id) ON DELETE CASCADE,
    quiz_id INT REFERENCES Quizzes(quiz_id) ON DELETE CASCADE,
    selected_answer CHAR(1) NOT NULL,
    score INT DEFAULT 0 NOT NULL,
    answered_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL
);

-- ============================================================================
-- INDEXES FOR PERFORMANCE OPTIMIZATION
-- ============================================================================
CREATE INDEX idx_components_category ON Components(category);
CREATE INDEX idx_buildcomponents_build ON BuildComponents(build_id);
CREATE INDEX idx_builds_user ON Builds(user_id);
CREATE INDEX idx_quizzes_category ON Quizzes(component_category);
CREATE INDEX idx_user_achievements_user ON UserAchievements(user_id);
