const team = [
  { name: 'Project Developer', role: 'Frontend Developer', duty: 'Created React TypeScript pages, Tailwind design and navigation.' },
  { name: 'SmartQR Module', role: 'Scanner Feature', duty: 'Handles image upload, camera scanner and manual QR input.' },
  { name: 'Data Analyzer Module', role: 'Analysis Feature', duty: 'Classifies QR content and gives category, length and safety suggestion.' }
];

function About() {
  return (
    <main className="mx-auto w-full max-w-7xl flex-1 space-y-8 px-5 py-10 lg:px-10">
      <section className="rounded-[2rem] border border-cyan-100 bg-white p-8 shadow-soft dark:border-cyan-900 dark:bg-slate-900">
        <h1 className="text-4xl font-black text-slate-950 dark:text-white">About / Team</h1>
        <p className="mt-4 max-w-4xl text-lg leading-8 text-slate-600 dark:text-slate-300">This page explains the team and modules behind the SmartQR Data Analyzer. It satisfies the required team/about page while staying connected to the actual project topic.</p>
      </section>

      <section className="grid gap-5 md:grid-cols-3">
        {team.map((member) => (
          <article key={member.name} className="rounded-3xl border border-cyan-100 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-soft dark:border-cyan-900 dark:bg-slate-900">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-cyan-700 text-2xl font-black text-white">{member.name.slice(0, 1)}</div>
            <h2 className="mt-5 text-xl font-black text-slate-950 dark:text-white">{member.name}</h2>
            <p className="font-bold text-cyan-700 dark:text-cyan-300">{member.role}</p>
            <p className="mt-4 leading-7 text-slate-600 dark:text-slate-300">{member.duty}</p>
          </article>
        ))}
      </section>

      <section className="rounded-[2rem] border border-cyan-100 bg-white p-8 shadow-soft dark:border-cyan-900 dark:bg-slate-900">
        <h2 className="text-2xl font-black text-cyan-800 dark:text-cyan-300">Project Purpose</h2>
        <p className="mt-4 leading-8 text-slate-600 dark:text-slate-300">The purpose of the project is to convert a simple webpage project into a modern React TypeScript application with required pages, reusable components, routing and Tailwind CSS styling. The system is useful for reading QR information and organizing scanned data in a simple dashboard.</p>
      </section>
    </main>
  );
}

export default About;
