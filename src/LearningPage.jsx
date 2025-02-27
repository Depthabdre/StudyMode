

function Learning() {
  return (
    <main className="flex flex-col  bg-gray-800 ">
        <Intro/>
    </main>
  );
}

function Intro(){
    return (
    <section className="bg-gray-900 text-white p-6 rounded-lg shadow-lg border border-gray-700 max-w-3xl mx-auto mt-10">
        <h1 className="text-3xl font-bold text-amber-400 mb-4">Quick Review</h1>
        <p className="text-gray-300 text-lg mb-6">
            Learn the fundamentals of focus and how to master deep concentration.
        </p>

        <div className="bg-gray-800 p-5 rounded-lg shadow-md border-l-4 border-amber-500">
            <h3 className="text-xl font-semibold mb-3 text-amber-300">You will learn about:</h3>
            <ul className="list-disc list-inside space-y-2">
            <li className="text-gray-300 hover:text-white transition-all">🔹 What is Focus</li>
            <li className="text-gray-300 hover:text-white transition-all">🔹 Why Focus is Important</li>
            <li className="text-gray-300 hover:text-white transition-all">🔹 Things That Distract Us from Focusing</li>
            <li className="text-gray-300 hover:text-white transition-all">🔹 How to Focus Properly</li>
            </ul>
        </div>
    </section>

   
    );
}


export default Learning;
