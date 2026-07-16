# Component photos

Drop real product photos into these folders using the **exact filenames** below.
Each file is optional — until it exists, the app automatically falls back to a
drawn placeholder icon (see `src/app/components/ComponentImage.tsx`), so you
can add photos gradually without breaking anything.

**Format:** PNG or JPG, ideally a clean product shot on a plain/transparent
background, roughly square (e.g. 600x600px). Keep filenames exactly as listed
— they're wired up by path in `src/app/components/data/*.tsx`.

## CPU

| File | Component |
|---|---|
| `cpu/intel/i5-12400f.png` | Intel Core i5-12400F |
| `cpu/intel/i7-12700k.png` | Intel Core i7-12700K |
| `cpu/intel/i5-13600k.png` | Intel Core i5-13600K |
| `cpu/intel/i9-13900k.png` | Intel Core i9-13900K |
| `cpu/intel/i5-14600k.png` | Intel Core i5-14600K |
| `cpu/intel/i7-14700k.png` | Intel Core i7-14700K |
| `cpu/amd/ryzen5-5600x.png` | AMD Ryzen 5 5600X |
| `cpu/amd/ryzen7-5800x3d.png` | AMD Ryzen 7 5800X3D |
| `cpu/amd/ryzen5-7600x.png` | AMD Ryzen 5 7600X |
| `cpu/amd/ryzen7-7800x3d.png` | AMD Ryzen 7 7800X3D |
| `cpu/amd/ryzen5-9600x.png` | AMD Ryzen 5 9600X |
| `cpu/amd/ryzen9-9950x.png` | AMD Ryzen 9 9950X |

## GPU

| File | Component |
|---|---|
| `gpu/nvidia/rtx-3060.png` | NVIDIA RTX 3060 12GB |
| `gpu/nvidia/rtx-3080.png` | NVIDIA RTX 3080 10GB |
| `gpu/nvidia/rtx-4060.png` | NVIDIA RTX 4060 8GB |
| `gpu/nvidia/rtx-4080-super.png` | NVIDIA RTX 4080 Super 16GB |
| `gpu/amd/rx-6600.png` | AMD Radeon RX 6600 8GB |
| `gpu/amd/rx-6800-xt.png` | AMD Radeon RX 6800 XT 16GB |
| `gpu/amd/rx-7600.png` | AMD Radeon RX 7600 8GB |
| `gpu/amd/rx-7800-xt.png` | AMD Radeon RX 7800 XT 16GB |

## Motherboard

| File | Component |
|---|---|
| `motherboard/asus/prime-z790-a.png` | ASUS Prime Z790-A WiFi |
| `motherboard/asus/rog-strix-b650e-f.png` | ASUS ROG Strix B650E-F Gaming WiFi |
| `motherboard/asus/prime-a520m-k.png` | ASUS Prime A520M-K |
| `motherboard/msi/mag-b650-tomahawk.png` | MSI MAG B650 Tomahawk WiFi |
| `motherboard/msi/pro-z690-a.png` | MSI PRO Z690-A WiFi |
| `motherboard/gigabyte/b650-aorus-elite-ax.png` | Gigabyte B650 AORUS Elite AX |
| `motherboard/gigabyte/h610m-h.png` | Gigabyte H610M H DDR4 |

## RAM

| File | Component |
|---|---|
| `ram/corsair/vengeance-ddr5-32gb.png` | Corsair Vengeance 32GB DDR5 5600MHz |
| `ram/corsair/vengeance-lpx-ddr4-16gb.png` | Corsair Vengeance LPX 16GB DDR4 3200MHz |
| `ram/gskill/trident-z5-ddr5-32gb.png` | G.Skill Trident Z5 32GB DDR5 6000MHz |
| `ram/kingston/fury-beast-ddr4-16gb.png` | Kingston FURY Beast 16GB DDR4 3600MHz |

## Storage (SSD/HDD)

| File | Component |
|---|---|
| `ssd/samsung/980-pro-1tb.png` | Samsung 980 Pro 1TB M.2 NVMe SSD |
| `ssd/wd/blue-sn580-1tb.png` | WD Blue SN580 1TB M.2 NVMe SSD |
| `ssd/crucial/mx500-1tb.png` | Crucial MX500 1TB SATA 2.5" SSD |
| `hdd/seagate/barracuda-2tb.png` | Seagate BarraCuda 2TB HDD |
| `hdd/wd/black-2tb.png` | WD Black 2TB Performance HDD |

## Power Supply

| File | Component |
|---|---|
| `psu/evga/500-w1.png` | EVGA 500 W1 500W |
| `psu/msi/mag-a650bn.png` | MSI MAG A650BN 650W |
| `psu/corsair/rm750x.png` | Corsair RM750x 750W |
| `psu/evga/supernova-850-gt.png` | EVGA SuperNOVA 850 GT 850W |

## Cooling & Fans

| File | Component |
|---|---|
| `cooler/intel/laminar-rm1.png` | Intel Laminar RM1 Stock Cooler |
| `cooler/coolermaster/hyper-212-black.png` | Cooler Master Hyper 212 Black Edition |
| `cooler/noctua/nh-d15.png` | Noctua NH-D15 Air Cooler |
| `cooler/corsair/icue-h100i-elite.png` | Corsair iCUE H100i Elite AIO Liquid Cooler |
| `fan/corsair/sp120-pwm.png` | Corsair SP120 120mm Fan |
| `fan/noctua/nf-a12x25.png` | Noctua NF-A12x25 120mm Fan |

## Case

| File | Component |
|---|---|
| `case/nzxt/h510.png` | NZXT H510 Mid-Tower Case |
| `case/fractal-design/meshify-c.png` | Fractal Design Meshify C |
| `case/corsair/4000d-airflow.png` | Corsair 4000D Airflow ATX Case |
| `case/lian-li/o11-dynamic.png` | Lian Li O11 Dynamic |

## Other Peripherals

| File | Component |
|---|---|
| `optical/asus/drw-24f1st.png` | ASUS 24X DVD Writer |
| `network/tp-link/archer-tx50e.png` | TP-Link PCIe Archer WiFi Card |
| `sound/creative/sound-blaster-audigy.png` | Creative Sound Blaster PCIe Card |
| `paste/arctic/mx-6.png` | Arctic MX-6 Thermal Paste |
| `cables/premium/braided-extension-kit.png` | Braided Power & Data Cable Kit |

---

To add or rename a component, update its `image:` field in the matching file
under `src/app/components/data/` (e.g. `data/cpu.ts`, `data/gpu.ts`) so the
path stays in sync with whatever file you drop in here.
