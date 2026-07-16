# Component photos

Drop real product photos into **this single folder** using the **exact filenames**
below (no subfolders — every image lives directly in
`public/images/components/`). Each file is optional: until it exists, the app
automatically falls back to a drawn placeholder icon (see
`src/app/components/ComponentImage.tsx`), so you can add photos gradually
without breaking anything.

**Format:** PNG or JPG, ideally a clean product shot on a plain/transparent
background, roughly square (e.g. 600x600px). Keep filenames exactly as listed —
they're wired up by name in `src/app/components/data/*`.

## CPU

| File | Component |
|---|---|
| `i5-12400f.png` | Intel Core i5-12400F |
| `i7-12700k.png` | Intel Core i7-12700K |
| `i5-13600k.png` | Intel Core i5-13600K |
| `i9-13900k.png` | Intel Core i9-13900K |
| `i5-14600k.png` | Intel Core i5-14600K |
| `i7-14700k.png` | Intel Core i7-14700K |
| `ryzen5-5600x.png` | AMD Ryzen 5 5600X |
| `ryzen7-5800x3d.png` | AMD Ryzen 7 5800X3D |
| `ryzen5-7600x.png` | AMD Ryzen 5 7600X |
| `ryzen7-7800x3d.png` | AMD Ryzen 7 7800X3D |
| `ryzen5-9600x.png` | AMD Ryzen 5 9600X |
| `ryzen9-9950x.png` | AMD Ryzen 9 9950X |

## GPU

| File | Component |
|---|---|
| `rtx-3060.png` | NVIDIA RTX 3060 12GB |
| `rtx-3080.png` | NVIDIA RTX 3080 10GB |
| `rtx-4060.png` | NVIDIA RTX 4060 8GB |
| `rtx-4080-super.png` | NVIDIA RTX 4080 Super 16GB |
| `rx-6600.png` | AMD Radeon RX 6600 8GB |
| `rx-6800-xt.png` | AMD Radeon RX 6800 XT 16GB |
| `rx-7600.png` | AMD Radeon RX 7600 8GB |
| `rx-7800-xt.png` | AMD Radeon RX 7800 XT 16GB |

## Motherboard

| File | Component |
|---|---|
| `prime-z790-a.png` | ASUS Prime Z790-A WiFi |
| `rog-strix-b650e-f.png` | ASUS ROG Strix B650E-F Gaming WiFi |
| `prime-a520m-k.png` | ASUS Prime A520M-K |
| `mag-b650-tomahawk.png` | MSI MAG B650 Tomahawk WiFi |
| `pro-z690-a.png` | MSI PRO Z690-A WiFi |
| `b650-aorus-elite-ax.png` | Gigabyte B650 AORUS Elite AX |
| `h610m-h.png` | Gigabyte H610M H DDR4 |

## RAM

| File | Component |
|---|---|
| `vengeance-ddr5-32gb.png` | Corsair Vengeance 32GB DDR5 5600MHz |
| `vengeance-lpx-ddr4-16gb.png` | Corsair Vengeance LPX 16GB DDR4 3200MHz |
| `trident-z5-ddr5-32gb.png` | G.Skill Trident Z5 32GB DDR5 6000MHz |
| `fury-beast-ddr4-16gb.png` | Kingston FURY Beast 16GB DDR4 3600MHz |

## Storage (SSD/HDD)

| File | Component |
|---|---|
| `980-pro-1tb.png` | Samsung 980 Pro 1TB M.2 NVMe SSD |
| `blue-sn580-1tb.png` | WD Blue SN580 1TB M.2 NVMe SSD |
| `mx500-1tb.png` | Crucial MX500 1TB SATA 2.5" SSD |
| `barracuda-2tb.png` | Seagate BarraCuda 2TB HDD |
| `black-2tb.png` | WD Black 2TB Performance HDD |

## Power Supply

| File | Component |
|---|---|
| `500-w1.png` | EVGA 500 W1 500W |
| `mag-a650bn.png` | MSI MAG A650BN 650W |
| `rm750x.png` | Corsair RM750x 750W |
| `supernova-850-gt.png` | EVGA SuperNOVA 850 GT 850W |

## Cooling & Fans

| File | Component |
|---|---|
| `laminar-rm1.png` | Intel Laminar RM1 Stock Cooler |
| `hyper-212-black.png` | Cooler Master Hyper 212 Black Edition |
| `nh-d15.png` | Noctua NH-D15 Air Cooler |
| `icue-h100i-elite.png` | Corsair iCUE H100i Elite AIO Liquid Cooler |
| `sp120-pwm.png` | Corsair SP120 120mm Fan |
| `nf-a12x25.png` | Noctua NF-A12x25 120mm Fan |

## Case

| File | Component |
|---|---|
| `h510.png` | NZXT H510 Mid-Tower Case |
| `meshify-c.png` | Fractal Design Meshify C |
| `4000d-airflow.png` | Corsair 4000D Airflow ATX Case |
| `o11-dynamic.png` | Lian Li O11 Dynamic |

## Other Peripherals

| File | Component |
|---|---|
| `drw-24f1st.png` | ASUS 24X DVD Writer |
| `archer-tx50e.png` | TP-Link PCIe Archer WiFi Card |
| `sound-blaster-audigy.png` | Creative Sound Blaster PCIe Card |
| `mx-6.png` | Arctic MX-6 Thermal Paste |
| `braided-extension-kit.png` | Braided Power & Data Cable Kit |

---

To add or rename a component, update its `image:` field in the matching file
under `src/app/components/data/` (e.g. `data/cpu.ts`, `data/gpu.ts`) so the
filename stays in sync with whatever you drop in this folder.
