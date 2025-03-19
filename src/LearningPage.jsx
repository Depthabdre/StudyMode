import { Link } from "react-router-dom";

function Learning() {
  return (
    <>
    <FloatingButtonFocus/>  
    <main className="flex flex-col justify-center items-center bg-gray-900 text-white p-6 rounded-lg shadow-lg border border-gray-700  ">
        <Intro/>
    </main>
    </>
  );
}

function Intro(){
    return (
    <>
   
        
        <Recap/>
        <Focus/>
        <Notes/>
        <ThingsThatDistractUs/>
        <HowToFocusProperly/>
   
    </>

   
    );
}


export default Learning;

function Recap(){
  return(
  <section className="bg-gray-900 text-white p-6 rounded-lg shadow-lg  flex flex-col  ">
  <h1 className=" text-3xl font-bold text-amber-400">Quick Review</h1>
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

function Focus(){
    return(

        <section className="flex flex-col bg-gray-900 text-white font-sans p-8 rounded-lg shadow-md max-w-4xl mx-auto space-y-6">
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
      <section className="flex flex-col bg-gray-900 text-white font-sans p-8 rounded-lg shadow-md max-w-lg mx-auto space-y-6">
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
       
      </section>
    );
  }
  

  function ThingsThatDistractUs() {
    return (
      <section className="flex flex-col bg-gray-900 text-white font-sans p-8 rounded-lg shadow-md max-w-4xl mx-auto space-y-8">
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
          <h3 className="text-2xl font-semibold text-white">
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
          <h3 className="text-2xl font-semibold text-white">
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
          <h3 className="text-2xl font-semibold text-white">
            How to Control These Distractions? 
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
      <section className="flex flex-col bg-gray-900 text-white font-sans p-8 rounded-lg shadow-md max-w-4xl mx-auto space-y-8">
  <h2 className="text-4xl font-bold border-b border-gray-700 pb-4">
    How to Focus Properly
  </h2>
  <div className="space-y-8">
    {/* External Distractions */}
    <div>
      <h3 className="text-3xl font-semibold">
        Minimizing External Distractions
      </h3>
      <p className="text-lg leading-relaxed">
        To focus effectively, it is important to reduce the time spent on highly stimulating activities.
      </p>
      <p className="text-lg leading-relaxed">
        Watching series, browsing TikTok, YouTube, and other social media can significantly disrupt your concentration.
      </p>
      <p className="text-lg leading-relaxed">
        First, identify your core values.
      </p>
      <p className="text-lg leading-relaxed">
        Then determine if these activities align with those values.
      </p>
      <p className="text-lg leading-relaxed">
        If they do not, consider removing or limiting these distractions.
      </p>
      <p className="text-lg leading-relaxed">
        Avoid deceiving yourself into thinking you can simply control your impulses.
      </p>
      <p className="text-lg leading-relaxed">
        Instead, use an avoidance strategy to maintain your focus.
      </p>
    </div>

    {/* Internal Distractions */}
    <div className="text-justify">
      <h3 className="text-3xl font-semibold mb-4 text-start">
        Managing Internal Distractions: Acceptance and Enjoyment
      </h3>
      <p className="text-lg leading-relaxed mb-4">  
    <strong className="text-xl">Acceptance:</strong> The moment you fully accept what you're doing, enjoyment naturally follows, and the action becomes an end in itself. When you embrace every task, your energy becomes powerful and magnetic, drawing in positivity and making your work more impactful. Let acceptance be your daily habit—it transforms every action into a source of strength and attraction.  
</p>

      <p className="text-lg leading-relaxed">
        Acceptance means acknowledging the present moment and engaging with it willingly.
      </p>
      <p className="text-lg leading-relaxed">
        This mindset brings a subtle inner peace that energizes your actions.
      </p>
      <p className="text-lg leading-relaxed mb-6">
        It is an active, creative process that helps you take responsibility for your state of consciousness.
      </p>
      <p className="text-lg leading-relaxed">
        <strong className="text-xl">Enjoyment:</strong> True focus also comes from finding joy in what you do.
      </p>
      <p className="text-lg leading-relaxed">
        Rather than waiting for the ideal moment, learn to appreciate the task at hand.
      </p>
      <p className="text-lg leading-relaxed">
        Enjoyment is not solely derived from the activity itself; it flows from an inner state of fulfillment.
      </p>
      <p className="text-lg leading-relaxed">
        By centering your attention on the present, you boost your ability to enjoy your work.
      </p>
      <p className="text-lg leading-relaxed">
        This enhances both your productivity and overall quality of life.
      </p>
      <p className="text-lg leading-relaxed">
        Do not seek external validation for joy, as this often leads to frustration.
      </p>
      <p className="text-lg leading-relaxed">
        Embrace the present and let enjoyment be the driving force behind your actions.
      </p>
    </div>
  </div>
</section>

    );
  }
  
  function FloatingButtonFocus() {
    return (
      <div className="absolute right-4 top-4 bg-amber-900 text-white px-4 py-2 rounded-md shadow-lg hover:bg-amber-700 transition-all">
        <Link to="/" className="text-white text-sm font-semibold">
          Focus Session
        </Link>
      </div>
    );
  }
 
  
  
  
  
  
  
  