const reviews = [
  { name: 'Ayesha Khan', role: 'Student Tester', rating: '5/5', text: 'The QR scanner page is simple and the dashboard makes the saved records easy to understand.' },
  { name: 'Bilal Ahmed', role: 'Classmate', rating: '4.8/5', text: 'I liked the dark mode and the analysis result cards because they clearly show category and risk level.' },
  { name: 'Sara Ali', role: 'Web Systems Student', rating: '5/5', text: 'The project has all required pages and the navigation is easy to use on desktop and mobile.' }
];

function Reviews() {
  return (
    <main className="mx-auto w-full max-w-7xl flex-1 space-y-8 px-5 py-10 lg:px-10">
      <section className="rounded-[2rem] border border-cyan-100 bg-white p-8 shadow-soft dark:border-cyan-900 dark:bg-slate-900">
        <h1 className="text-4xl font-black text-slate-950 dark:text-white">Reviews</h1>
        <p className="mt-4 max-w-4xl text-lg leading-8 text-slate-600 dark:text-slate-300">This page presents sample feedback for the SmartQR Analyzer project. It is included as one of the new required React TypeScript pages.</p>
      </section>

      <section className="grid gap-5 md:grid-cols-3">
        {reviews.map((review) => (
          <article key={review.name} className="rounded-3xl border border-cyan-100 bg-white p-6 shadow-sm dark:border-cyan-900 dark:bg-slate-900">
            <p className="text-3xl font-black text-amber-500">★★★★★</p>
            <h2 className="mt-4 text-xl font-black text-slate-950 dark:text-white">{review.name}</h2>
            <p className="text-sm font-bold text-cyan-700 dark:text-cyan-300">{review.role} | {review.rating}</p>
            <p className="mt-4 leading-7 text-slate-600 dark:text-slate-300">{review.text}</p>
          </article>
        ))}
      </section>

      <section className="rounded-[2rem] border border-cyan-100 bg-white p-8 shadow-soft dark:border-cyan-900 dark:bg-slate-900">
        <h2 className="text-2xl font-black text-cyan-800 dark:text-cyan-300">Why Reviews Matter</h2>
        <p className="mt-4 leading-8 text-slate-600 dark:text-slate-300">Reviews help explain whether the system is usable, understandable and suitable for students. For this class project, reviews also show that the page design can display repeated content using React arrays and TypeScript components.</p>
      </section>
    </main>
  );
}

export default Reviews;
