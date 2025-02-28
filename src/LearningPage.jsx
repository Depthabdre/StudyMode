

function Learning() {
  return (
    <main className="flex flex-col  bg-gray-800 ">
        <Intro/>
    </main>
  );
}

function Intro(){
    return (
        <>
    <section className="bg-gray-900 text-white p-6 rounded-lg shadow-lg border border-gray-700 max-w-3xl mx-auto mt-10">
        <h1 className=" text-3xl font-bold text-amber-400 mb-4">Quick Review</h1>
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

    <Focus/>
    <Notes/>
    <ThingsThatDistractUs/>
    <HowToFocusProperly/>

    </>

   
    );
}


export default Learning;

function Focus(){
    return(

        <section className="bg-gray-900 text-white font-sans p-8 rounded-lg shadow-md max-w-4xl mx-auto space-y-6">
  <h2 className="text-3xl font-bold border-b border-gray-700 pb-2">
    What is Focus
  </h2>
  <p className="text-gray-300">
    Focus is the ability to concentrate solely on the task at hand, being fully present in that particular activity.
  </p>
</section>

    );
}

function YouTubeEmbed() {
    return (
      <div className="flex justify-center items-center bg-gray-900 p-8">
        <iframe
          className="rounded-lg shadow-lg"
          width="560"
          height="315"
          src="https://www.youtube.com/embed/u9raVu4v7KQabdre"
          title="YouTube video"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>
    );
  }
  
  function Notes() {
    return (
      <section className="bg-gray-900 text-white font-sans p-8 rounded-lg shadow-md max-w-lg mx-auto space-y-6">
        <h2 className="text-2xl font-bold border-b border-gray-700 pb-2">
          Why is Focus Important? 🤔🎯
        </h2>
        <p className="text-gray-300">
          Nowadays, focus is more important than ever because achieving great things requires deep concentration—except for watching TikTok! 😃🙄
        </p>
        <ul className="space-y-4">
          <li className="bg-gray-800 border border-gray-700 p-4 rounded-md shadow-sm">
            <span className="text-orange-400">💼 Productivity at Work:</span> Staying focused helps you complete tasks efficiently.
          </li>
          <li className="bg-gray-800 border border-gray-700 p-4 rounded-md shadow-sm">
            <span className="text-orange-400">🎓 Mastering Hard Skills:</span> Your ability to learn depends on how well you focus.
          </li>
          <li className="bg-gray-800 border border-gray-700 p-4 rounded-md shadow-sm">
            <span className="text-orange-400">❤️ Building Strong Relationships:</span> Active listening is key to deeper connections.
          </li>
          <li className="bg-gray-800 border border-gray-700 p-4 rounded-md shadow-sm">
            <span className="text-orange-400">🌟 Living a Better Life:</span> Focusing on the present moment leads to greater joy.
          </li>
        </ul>
        <p className="text-orange-300">
          In short, focus is the key to success, happiness, and deep connections in life! 🚀🔥
        </p>
      </section>
    );
  }
  

  function ThingsThatDistractUs() {
    return (
      <section className="bg-gray-900 text-white font-sans p-8 rounded-lg shadow-md max-w-4xl mx-auto space-y-8">
        <h2 className="text-3xl font-bold mb-6 border-b border-gray-700 pb-2">
          Things That Distract Us from Focusing 🤔
        </h2>
        <p className="mb-6 text-gray-300">
          Distractions can be divided into two main categories:{" "}
          <strong className="text-white">external distractions</strong> and{" "}
          <strong className="text-white">internal distractions</strong>.
        </p>
  
        {/* External Factors */}
        <div className="border border-gray-700 rounded-lg p-6 shadow-sm">
          <h3 className="text-2xl font-semibold mb-4 text-white">
            1. External Distractions 📱
          </h3>
          <p className="mb-4 text-gray-300">
            External distractions come from things around us. The most common one today is our{" "}
            <strong className="text-white">mobile phone</strong>. It’s easy to get distracted when our phones buzz with notifications or when we’re tempted to check social media.
          </p>
          <p className="mb-4 text-gray-300">
            Another major external distraction is{" "}
            <strong className="text-white">overstimulating content</strong>, like watching endless videos on TikTok, YouTube Shorts, or binge-watching series. These activities provide quick dopamine hits, making it harder to focus on tasks that require sustained attention.
          </p>
          <p className="text-gray-300">
            Other external distractions include{" "}
            <strong className="text-white">noisy environments</strong>,{" "}
            <strong className="text-white">disorganized workspaces</strong>, and constant interruptions from colleagues or family members.
          </p>
        </div>
  
        {/* Internal Factors */}
        <div className="border border-gray-700 rounded-lg p-6 shadow-sm">
          <h3 className="text-2xl font-semibold mb-4 text-white">
            2. Internal Distractions 😔
          </h3>
          <p className="mb-4 text-gray-300">
            Internal distractions are often harder to manage because they stem from our thoughts and feelings. One common internal distraction is{" "}
            <strong className="text-white">negative thinking</strong>, such as doubting our abilities or worrying about the future.
          </p>
          <p className="mb-4 text-gray-300">
            Another major internal distraction is{" "}
            <strong className="text-white">stress and anxiety</strong>. When we’re anxious, our minds race, making it difficult to stay focused.
          </p>
          <p className="text-gray-300">
            <strong className="text-white">Unsettled emotions</strong>—like frustration, anger, or boredom—can also prevent us from focusing, challenging our ability to remain present and effective.
          </p>
        </div>
  
        {/* How to Control Distractions */}
        <div className="bg-gray-800 border border-gray-700 rounded-lg p-6 shadow-sm">
          <h3 className="text-2xl font-semibold mb-4 text-white">
            How to Control These Distractions? 🚀
          </h3>
          <p className="mb-4 text-gray-300">
            Distractions are part of life, but the good news is that you can learn to control them! In the <strong className="text-white">Learning Session</strong>, you’ll be guided through step-by-step strategies to improve your focus.
          </p>
          <p className="text-gray-300">
            By practicing simple techniques and adjusting your habits, you can regain control over your attention and enhance your productivity.
          </p>
        </div>
      </section>
    );
  }
  
  
  function HowToFocusProperly() {
    return (
      <section className="bg-gray-900 text-white font-sans p-8 rounded-lg shadow-md max-w-4xl mx-auto space-y-8">
        <h2 className="text-3xl font-bold border-b border-gray-700 pb-2">
          How to Focus Properly
        </h2>
        <div className="space-y-6">
          {/* External Distractions */}
          <div>
            <h3 className="text-2xl font-semibold">
              Minimizing External Distractions
            </h3>
            <p className="text-gray-300">
              To focus effectively, it is important to reduce the time spent on highly stimulating activities. Watching series, browsing TikTok, YouTube, and other social media can significantly disrupt your concentration. First, identify your core values. Then determine if these activities align with those values. If they do not, consider removing or limiting these distractions. Avoid deceiving yourself into thinking you can simply control your impulses. Instead, use an avoidance strategy to maintain your focus.
            </p>
          </div>
  
          {/* Internal Distractions */}
          <div>
            <h3 className="text-2xl font-semibold">
              Managing Internal Distractions: Acceptance and Enjoyment
            </h3>
            <p className="text-gray-300">
              <strong>Acceptance:</strong> At times, you might not enjoy every task. However, accepting that a particular activity is necessary can make a big difference. Acceptance means acknowledging the present moment and engaging with it willingly. This mindset brings a subtle inner peace that energizes your actions. It is an active, creative process that helps you take responsibility for your state of consciousness.
            </p>
            <p className="text-gray-300">
              <strong>Enjoyment:</strong> True focus also comes from finding joy in what you do. Rather than waiting for the ideal moment, learn to appreciate the task at hand. Enjoyment is not solely derived from the activity itself; it flows from an inner state of fulfillment. By centering your attention on the present, you boost your ability to enjoy your work, thereby enhancing both your productivity and overall quality of life. Do not seek external validation for joy, as this often leads to frustration. Embrace the present and let enjoyment be the driving force behind your actions.
            </p>
          </div>
        </div>
      </section>
    );
  }
  
  
 
  
  
  
  
  
  
  