const features = [
  {
    title: "De ce să externalizați IT-ul?",
    description: "O echipă de specialiști IT este mai bună decât un singur specialist.",
    items: [
      "Fiecare membru al echipei este specializat pe un anumit domeniu",
      "Răspuns prompt la solicitări, deplasare ori de câte ori este necesar",
      "Dispare cheltuielile salariale care aproape dublează costurile",
      "Economisiți spațiul necesar pentru un departament IT intern",
    ],
    icon: (
      <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
      </svg>
    ),
  },
  {
    title: "Ce vă oferim?",
    description: "Consultanță și servicii IT complete, adaptate nevoilor dumneavoastră.",
    items: [
      "Consultanță gratuită pentru achiziția de software și hardware",
      "Asistență prin telefon, email și Remote HelpDesk securizat",
      "Menținerea echipamentelor în perfectă stare de funcționare",
      "Auditarea periodică a infrastructurii IT",
    ],
    icon: (
      <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
      </svg>
    ),
  },
];

export default function Features() {
  return (
    <section className="py-24 bg-gradient-to-b from-gray-50 to-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="text-blue-600 font-semibold text-sm uppercase tracking-wider">Avantaje</span>
          <h2 className="mt-3 text-3xl sm:text-4xl font-bold text-gray-900">
            De ce să alegeți IT Advisors?
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className={`relative p-8 lg:p-10 rounded-3xl ${
                index === 0
                  ? "bg-gradient-to-br from-blue-600 to-cyan-500 text-white"
                  : "bg-white border border-gray-200 shadow-lg"
              }`}
            >
              <div className={`mb-6 ${index === 0 ? "text-white/90" : "text-blue-600"}`}>
                {feature.icon}
              </div>
              <h3 className={`text-2xl font-bold mb-3 ${index === 0 ? "text-white" : "text-gray-900"}`}>
                {feature.title}
              </h3>
              <p className={`mb-6 ${index === 0 ? "text-blue-100" : "text-gray-600"}`}>
                {feature.description}
              </p>
              <ul className="space-y-4">
                {feature.items.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <svg
                      className={`w-6 h-6 flex-shrink-0 mt-0.5 ${
                        index === 0 ? "text-cyan-300" : "text-green-500"
                      }`}
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={2}
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className={index === 0 ? "text-white/90" : "text-gray-700"}>
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Trust badges */}
        <div className="mt-20 text-center">
          <p className="text-gray-500 mb-8">Parteneri și tehnologii cu care lucrăm</p>
          <div className="flex flex-wrap justify-center items-center gap-8 lg:gap-16 opacity-60 grayscale">
            {["Microsoft", "Cisco", "Dell", "HP", "VMware", "Sophos"].map((partner) => (
              <div key={partner} className="text-xl font-bold text-gray-400">
                {partner}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

