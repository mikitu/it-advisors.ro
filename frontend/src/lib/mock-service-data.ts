import type { Testimonial, Showcase, ProcessStep } from "./strapi";

interface MockServiceData {
  title: string;
  description: string;
  icon: string;
  features: string[];
  fullDescription: string;
  benefits: string[];
  process: ProcessStep[];
  stats: Record<string, string | number>;
  testimonials: Testimonial[];
  showcases: Showcase[];
}

const baseTestimonials: Record<string, Testimonial[]> = {
  "administrare-it": [
    { id: 1, documentId: "t1", clientName: "Andrei Popescu", clientRole: "Director General", clientCompany: "TechStart SRL", review: "Colaborăm cu CAM Advisors de peste 3 ani pentru administrarea întregii infrastructuri IT. Profesionalismul și răspunsul prompt la orice problemă ne-au convins că am făcut alegerea corectă.", rating: 5, featured: true },
    { id: 2, documentId: "t2", clientName: "Elena Ionescu", clientRole: "CFO", clientCompany: "FinServ Romania", review: "Externalizarea administrării IT către CAM Advisors ne-a permis să ne concentrăm pe business. Costurile s-au redus cu 40% față de echipa internă.", rating: 5, featured: false },
  ],
  "suport-tehnic": [
    { id: 3, documentId: "t3", clientName: "Mihai Dumitrescu", clientRole: "Office Manager", clientCompany: "Creative Agency", review: "Suportul tehnic 24/7 este fantastic. Am avut o problemă critică într-o sâmbătă seara și au rezolvat-o în mai puțin de o oră.", rating: 5, featured: true },
    { id: 4, documentId: "t4", clientName: "Ana Maria Stoica", clientRole: "HR Manager", clientCompany: "HR Solutions", review: "Echipa de suport este mereu disponibilă și rezolvă problemele rapid. Recomand cu încredere!", rating: 5, featured: false },
  ],
  "telefonie-voip": [
    { id: 5, documentId: "t5", clientName: "Bogdan Marin", clientRole: "Director Operațiuni", clientCompany: "Call Center Pro", review: "Migrarea la VoIP a fost impecabilă. Calitatea apelurilor este excelentă și costurile s-au redus cu 60%.", rating: 5, featured: true },
    { id: 6, documentId: "t6", clientName: "Cristina Vlad", clientRole: "Sales Manager", clientCompany: "Sales Force SRL", review: "Sistemul VoIP ne permite să lucrăm de oriunde. Integrarea cu CRM-ul nostru a fost perfectă.", rating: 5, featured: false },
  ],
  "web-hosting": [
    { id: 7, documentId: "t7", clientName: "Dan Radu", clientRole: "Marketing Director", clientCompany: "E-Shop Romania", review: "Website-ul nostru nou arată fantastic și se încarcă foarte repede. Vânzările online au crescut cu 150% după redesign.", rating: 5, featured: true },
    { id: 8, documentId: "t8", clientName: "Ioana Popa", clientRole: "Owner", clientCompany: "Boutique Fashion", review: "Hosting-ul este super stabil. În 2 ani nu am avut niciun minut de downtime. Recomand!", rating: 5, featured: false },
  ],
  "virtualizare": [
    { id: 9, documentId: "t9", clientName: "George Stanciu", clientRole: "CTO", clientCompany: "DataTech Solutions", review: "Virtualizarea serverelor ne-a redus costurile cu hardware cu 70% și a crescut flexibilitatea enorm.", rating: 5, featured: true },
    { id: 10, documentId: "t10", clientName: "Laura Gheorghe", clientRole: "IT Manager", clientCompany: "Clinica Medicală Plus", review: "Migrarea la infrastructură virtualizată a fost fără probleme. Acum putem scala resursele instant.", rating: 5, featured: false },
  ],
  "securitate": [
    { id: 11, documentId: "t11", clientName: "Radu Cristea", clientRole: "Director Securitate", clientCompany: "BankSecure SRL", review: "Auditul de securitate a identificat vulnerabilități critice pe care le-am remediat imediat. Acum dormim liniștiți.", rating: 5, featured: true },
    { id: 12, documentId: "t12", clientName: "Simona Matei", clientRole: "Compliance Officer", clientCompany: "Insurance Corp", review: "Implementarea soluțiilor de securitate ne-a ajutat să obținem certificarea ISO 27001.", rating: 5, featured: false },
  ],
};

const baseShowcases: Record<string, Showcase[]> = {
  "administrare-it": [
    { id: 1, documentId: "s1", title: "Externalizare completă IT pentru lanț de retail", slug: "retail-it-outsourcing", clientName: "RetailMax România", challenge: "Gestionarea a 50+ locații cu infrastructură IT eterogenă, costuri mari de mentenanță și timp de răspuns lent la incidente.", solution: "Implementarea unui sistem centralizat de management IT, standardizarea echipamentelor și crearea unui NOC dedicat pentru monitorizare 24/7.", results: ["Reducere 45% costuri IT", "Timp răspuns < 30 min", "99.9% uptime", "50+ locații gestionate"], stats: { locations: 52, users: 1200, savings: "45%", uptime: "99.9%" }, featured: true, completedAt: "2024-06-15" },
  ],
  "suport-tehnic": [
    { id: 2, documentId: "s2", title: "Helpdesk dedicat pentru companie multinațională", slug: "multinational-helpdesk", clientName: "GlobalTech Industries", challenge: "Suport IT pentru 500+ angajați în 3 țări, cu cerințe de SLA stricte și suport multilingv.", solution: "Implementarea unui sistem de ticketing avansat, echipă dedicată 24/7 și portal self-service.", results: ["SLA 99.5% respectat", "Satisfacție 4.8/5", "Rezolvare first-call 75%", "500+ utilizatori"], stats: { users: 500, countries: 3, satisfaction: "4.8/5", firstCall: "75%" }, featured: true, completedAt: "2024-08-20" },
  ],
  "telefonie-voip": [
    { id: 3, documentId: "s3", title: "Migrare completă VoIP pentru call center", slug: "call-center-voip", clientName: "ContactPro Services", challenge: "Înlocuirea sistemului telefonic tradițional pentru un call center cu 200 de agenți.", solution: "Migrare în etape către platforma VoIP, integrare cu CRM și training complet.", results: ["Reducere 60% costuri", "Calitate HD", "Integrare CRM", "0 min downtime"], stats: { agents: 200, savings: "60%", quality: "HD", downtime: "0 min" }, featured: true, completedAt: "2024-04-10" },
  ],
};

export const mockServiceData: Record<string, MockServiceData> = {
  "administrare-it": {
    title: "Administrare IT", description: "Externalizare completă a departamentului IT pentru eficiență maximă", icon: "🖥️",
    features: ["Monitorizare infrastructură 24/7", "Management servere și rețele", "Backup și disaster recovery", "Actualizări și patch management", "Raportare lunară detaliată", "Suport dedicat"],
    fullDescription: "Serviciul nostru de administrare IT oferă externalizare completă a departamentului IT, permițându-vă să vă concentrați pe core business-ul dumneavoastră. Echipa noastră de specialiști certificați gestionează întreaga infrastructură IT.",
    benefits: ["Reducere costuri operaționale cu până la 40%", "Acces la expertiză specializată", "Scalabilitate flexibilă", "Focus pe core business", "Monitorizare proactivă 24/7", "Backup și disaster recovery inclus"],
    process: [{ step: 1, title: "Audit infrastructură", desc: "Evaluăm complet infrastructura IT existentă" }, { step: 2, title: "Propunere soluție", desc: "Creăm un plan personalizat" }, { step: 3, title: "Implementare", desc: "Preluăm administrarea sistemelor" }, { step: 4, title: "Monitorizare", desc: "Monitorizăm și optimizăm constant" }],
    stats: { clients: 150, uptime: "99.9%", response: "<30min", experience: "15+ ani" },
    testimonials: baseTestimonials["administrare-it"], showcases: baseShowcases["administrare-it"],
  },
  "suport-tehnic": {
    title: "Suport Tehnic IT", description: "Asistență tehnică profesională disponibilă 24/7", icon: "🛠️",
    features: ["Helpdesk 24/7/365", "Suport remote și on-site", "Rezolvare rapidă incidente", "Portal self-service", "SLA garantat", "Rapoarte detaliate"],
    fullDescription: "Serviciul nostru de suport tehnic IT oferă asistență profesională pentru toate problemele IT ale companiei dumneavoastră.",
    benefits: ["Suport disponibil 24/7/365", "Rezolvare rapidă a problemelor", "Echipă certificată", "Portal self-service", "Rapoarte detaliate", "SLA garantat"],
    process: [{ step: 1, title: "Deschidere ticket", desc: "Raportați problema" }, { step: 2, title: "Triaj", desc: "Clasificăm și alocăm" }, { step: 3, title: "Rezolvare", desc: "Tehnicianul rezolvă" }, { step: 4, title: "Verificare", desc: "Confirmăm rezolvarea" }],
    stats: { tickets: "50K+", satisfaction: "4.9/5", firstCall: "78%", avgResponse: "15min" },
    testimonials: baseTestimonials["suport-tehnic"], showcases: baseShowcases["suport-tehnic"],
  },
  "telefonie-voip": {
    title: "Telefonie VoIP", description: "Soluții moderne de comunicații unificate pentru afaceri", icon: "📞",
    features: ["Telefonie IP de înaltă calitate", "Conferințe audio/video", "Integrare CRM/ERP", "Aplicații mobile", "Costuri reduse", "Scalare instantanee"],
    fullDescription: "Telefonia VoIP modernă oferă flexibilitate și economii semnificative pentru comunicațiile companiei dumneavoastră.",
    benefits: ["Costuri reduse cu până la 60%", "Calitate HD cristalină", "Mobilitate totală", "Integrare CRM/ERP", "Conferințe video incluse", "Scalare instantanee"],
    process: [{ step: 1, title: "Analiză cerințe", desc: "Evaluăm nevoile" }, { step: 2, title: "Design soluție", desc: "Proiectăm arhitectura" }, { step: 3, title: "Implementare", desc: "Instalăm sistemul" }, { step: 4, title: "Training", desc: "Instruim echipa" }],
    stats: { calls: "1M+", quality: "HD", savings: "60%", uptime: "99.99%" },
    testimonials: baseTestimonials["telefonie-voip"], showcases: baseShowcases["telefonie-voip"],
  },
  "web-hosting": {
    title: "Web Design & Hosting", description: "Creăm și găzduim website-uri profesionale și rapide", icon: "🌐",
    features: ["Design modern responsive", "Hosting performant SSD", "Certificat SSL gratuit", "Backup zilnic automat", "Optimizare SEO", "Suport tehnic dedicat"],
    fullDescription: "Serviciile noastre de web design și hosting combină creativitatea cu tehnologia pentru a crea prezențe online de impact.",
    benefits: ["Design modern și responsive", "Optimizare SEO inclusă", "Hosting performant", "Certificat SSL gratuit", "Backup zilnic automat", "Suport tehnic dedicat"],
    process: [{ step: 1, title: "Brief & Research", desc: "Înțelegem obiectivele" }, { step: 2, title: "Design & Prototip", desc: "Creăm designul" }, { step: 3, title: "Dezvoltare", desc: "Construim site-ul" }, { step: 4, title: "Lansare", desc: "Publicăm și monitorizăm" }],
    stats: { websites: "500+", uptime: "99.99%", speed: "<2s", clients: "300+" },
    testimonials: baseTestimonials["web-hosting"], showcases: [],
  },
  "virtualizare": {
    title: "Virtualizare", description: "Optimizează resursele hardware prin virtualizare avansată", icon: "☁️",
    features: ["VMware vSphere", "Hyper-V", "Migrare P2V", "High Availability", "Disaster Recovery", "Management centralizat"],
    fullDescription: "Virtualizarea permite utilizarea eficientă a resurselor hardware, reducând costurile și crescând flexibilitatea infrastructurii IT.",
    benefits: ["Reducere costuri hardware 70%", "Scalare instant resurse", "Disaster recovery rapid", "Management centralizat", "Eficiență energetică", "Migrare fără downtime"],
    process: [{ step: 1, title: "Assessment", desc: "Evaluăm infrastructura" }, { step: 2, title: "Planificare", desc: "Proiectăm arhitectura" }, { step: 3, title: "Migrare", desc: "Migrăm sistemele" }, { step: 4, title: "Optimizare", desc: "Monitorizăm și optimizăm" }],
    stats: { vms: "2000+", savings: "70%", migration: "100+", uptime: "99.99%" },
    testimonials: baseTestimonials["virtualizare"], showcases: [],
  },
  "securitate": {
    title: "Securitate IT", description: "Protejează-ți afacerea cu soluții complete de cybersecurity", icon: "🔒",
    features: ["Audit securitate", "Protecție endpoint", "Firewall enterprise", "SIEM & SOC", "Training angajați", "Incident response"],
    fullDescription: "Securitatea cibernetică este esențială în era digitală. Oferim soluții complete pentru protejarea datelor și sistemelor companiei.",
    benefits: ["Protecție completă endpoint", "Monitorizare 24/7 amenințări", "Audit și compliance", "Training angajați", "Incident response rapid", "Rapoarte executive"],
    process: [{ step: 1, title: "Security Audit", desc: "Evaluăm vulnerabilitățile" }, { step: 2, title: "Plan remediere", desc: "Prioritizăm riscurile" }, { step: 3, title: "Implementare", desc: "Instalăm soluțiile" }, { step: 4, title: "Monitorizare SOC", desc: "Monitorizăm continuu" }],
    stats: { threats: "10K+", blocked: "99.9%", response: "<5min", audits: "200+" },
    testimonials: baseTestimonials["securitate"], showcases: [],
  },
};

