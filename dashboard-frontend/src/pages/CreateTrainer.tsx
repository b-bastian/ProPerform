export default function CreateTrainer() {
  // TODO: Implement trainer creation logic

  return (
    <div className="flex items-center justify-center h-full w-full">
      <div className="bg-gradient-to-br from-green-600 via-teal-600 to-cyan-700 text-white rounded-3xl shadow-2xl p-10 max-w-3xl w-[90%] text-center">
        <h1 className="text-4xl font-bold mb-8">🏋️‍♂️ Trainer erstellen</h1>
        <div className="bg-white/20 rounded-2xl p-6 shadow-md hover:bg-white/30 transition transform hover:-translate-y-1 inline-block">
          <form>
            <input
              type="text"
              placeholder="Trainer Name"
              className="bg-transparent border-b border-white/30 focus:border-white outline-none px-2 py-1 mb-4 w-full"
            />
            <input
              type="email"
              placeholder="Trainer E-Mail"
              className="bg-transparent border-b border-white/30 focus:border-white outline-none px-2 py-1 mb-4 w-full"
            />
            <button className="bg-white text-green-600 px-6 py-2 rounded-lg font-medium transition hover:bg-gray-100">
              Neues Trainerkonto erstellen
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
