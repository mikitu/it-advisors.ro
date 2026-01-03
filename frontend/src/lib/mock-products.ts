import type { Product } from "./strapi";

export const mockProducts: Product[] = [
  {
    id: 1, documentId: "p1", name: "Microsoft 365 Business Basic", slug: "microsoft-365-business-basic",
    description: "Email profesional, OneDrive 1TB, Teams, aplicații web Office",
    sku: "MS365-BB-001", price: 55, salePrice: undefined, stock: 999, icon: "📧",
    featured: true, order: 1,
  },
  {
    id: 2, documentId: "p2", name: "Microsoft 365 Business Standard", slug: "microsoft-365-business-standard",
    description: "Toate aplicațiile Office desktop + cloud, Teams, OneDrive 1TB",
    sku: "MS365-BS-001", price: 115, salePrice: 99, stock: 999, icon: "💼",
    featured: true, order: 2,
  },
  {
    id: 3, documentId: "p3", name: "Windows 11 Pro", slug: "windows-11-pro",
    description: "Licență Windows 11 Professional - cheie digitală",
    sku: "WIN11-PRO-001", price: 899, salePrice: 749, stock: 50, icon: "🪟",
    featured: false, order: 3,
  },
  {
    id: 4, documentId: "p4", name: "Windows Server 2022 Standard", slug: "windows-server-2022",
    description: "Licență Windows Server 2022 Standard - 16 core",
    sku: "WINSRV-2022-001", price: 4599, salePrice: undefined, stock: 20, icon: "🖥️",
    featured: false, order: 4,
  },
  {
    id: 5, documentId: "p5", name: "Sophos Intercept X", slug: "sophos-intercept-x",
    description: "Protecție endpoint avansată - licență 1 an / 1 PC",
    sku: "SOPH-IX-001", price: 199, salePrice: 179, stock: 100, icon: "🛡️",
    featured: true, order: 5,
  },
  {
    id: 6, documentId: "p6", name: "Dell PowerEdge T150", slug: "dell-poweredge-t150",
    description: "Server tower entry-level, Intel Xeon E-2314, 16GB RAM, 1TB HDD",
    sku: "DELL-PE-T150", price: 8999, salePrice: undefined, stock: 5, icon: "🗄️",
    featured: false, order: 6,
  },
  {
    id: 7, documentId: "p7", name: "HP ProLiant ML30 Gen10", slug: "hp-proliant-ml30",
    description: "Server tower, Intel Xeon E-2224, 8GB RAM, 1TB HDD",
    sku: "HP-ML30-G10", price: 7499, salePrice: 6999, stock: 3, icon: "🗄️",
    featured: false, order: 7,
  },
  {
    id: 8, documentId: "p8", name: "Cisco RV345 VPN Router", slug: "cisco-rv345",
    description: "Router VPN dual WAN pentru afaceri mici și mijlocii",
    sku: "CISCO-RV345", price: 1899, salePrice: undefined, stock: 15, icon: "📡",
    featured: false, order: 8,
  },
  {
    id: 9, documentId: "p9", name: "APC Smart-UPS 1500VA", slug: "apc-smart-ups-1500",
    description: "UPS line-interactive cu LCD, 980W, runtime 10 min la 50% sarcină",
    sku: "APC-SMT1500", price: 2499, salePrice: 2299, stock: 12, icon: "🔋",
    featured: true, order: 9,
  },
  {
    id: 10, documentId: "p10", name: "VMware vSphere Essentials", slug: "vmware-vsphere-essentials",
    description: "Kit virtualizare pentru 3 servere, suport 1 an",
    sku: "VMW-VSE-001", price: 2799, salePrice: undefined, stock: 25, icon: "☁️",
    featured: false, order: 10,
  },
  {
    id: 11, documentId: "p11", name: "Backup Acronis Cyber Protect", slug: "acronis-cyber-protect",
    description: "Soluție backup și securitate all-in-one - 1 an / 1 server",
    sku: "ACR-CP-001", price: 599, salePrice: 499, stock: 50, icon: "💾",
    featured: false, order: 11,
  },
  {
    id: 12, documentId: "p12", name: "Ubiquiti UniFi Dream Machine Pro", slug: "ubiquiti-udm-pro",
    description: "Gateway enterprise all-in-one cu UniFi OS",
    sku: "UBQ-UDMP", price: 2199, salePrice: undefined, stock: 8, icon: "🌐",
    featured: true, order: 12,
  },
];

