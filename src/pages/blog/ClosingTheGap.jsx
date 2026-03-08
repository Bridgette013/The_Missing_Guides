import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import Logo from '../../components/Logo'
import '../../styles/tokens.css'
import styles from './ClosingTheGap.module.css'

export default function ClosingTheGap() {
  useEffect(() => {
    const bar = document.getElementById('tmg-progress')
    const onScroll = () => {
      const scrollTop = window.scrollY
      const docH = document.documentElement.scrollHeight - window.innerHeight
      if (bar) bar.style.width = (scrollTop / docH * 100) + '%'
    }
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      <div id="tmg-progress" className={styles.progressBar} />

      <nav className={styles.articleNav}>
        <Link to="/" className={styles.navLogo}>
          <Logo variant="light" size={36} />
          <div className={styles.navWordmark}>
            <span className={styles.wordmarkTop}>The Missing</span>
            <span className={styles.wordmarkBottom}>Guides</span>
          </div>
        </Link>
        <Link to="/blog" className={styles.navBack}>← All Essays</Link>
      </nav>

      <header className={styles.hero}>
        <div className={styles.heroLabel}>Personal Essay</div>
        <h1 className={styles.heroTitle}>Closing<br />the <em>Gap</em></h1>
        <p className={styles.heroSubtitle}>"He's sober right now.. it might be a good chance to tell him how you feel."</p>
        <div className={styles.heroMeta}>
          <span className={styles.byline}>The Missing Guides</span>
        </div>
      </header>

      <main className={styles.articleWrap}>
        <div className={styles.openingOrnament}>✦ &nbsp; ✦ &nbsp; ✦</div>

        <p className={styles.dropCap}>Twelve words. That's all it was. A text message on a Tuesday. The kind of thing any mom might say to her daughter about her dad. But if you knew what it took for those twelve words to exist — the years of fury, the language that was used, the people who were discarded, the lives that almost ended — you'd understand why I stared at my phone and couldn't breathe.</p>

        <p>This is the story of how we got there.</p>
        <p>I had rehearsed what I was going to say.</p>
        <p>I knew the call was coming. My mom had just found out that my ex-husband's brother-in-law — Nick — was renting a room from me, and my family had already made their position clear. He wasn't welcome at Thanksgiving. He wasn't welcome in conversation. As far as they were concerned, he wasn't welcome in my life.</p>
        <p>So when the phone rang and I heard that sharp, familiar edge in her voice, I was ready. I had my words lined up like armor. I thought I knew exactly how to make her see what I saw.</p>

        <blockquote className={styles.dialogue}>
          <p>"Mom, he's just like Cody though. Can't you see that? All of Cody's great qualities — Nick has them too. Imagine if Cody just took a wrong turn... and got stuck."</p>
          <p>Silence.</p>
          <p>"DON'T. YOU. EVER. compare that piece of shit to my son! He's a piece of shit just like Chris!!"</p>
        </blockquote>

        <p>The words hit me like a dagger. Not because they were loud. Not because she was angry. But because of what they revealed. My family had no reason to hate Nick. They didn't know his laugh, his generosity, the way he showed up when it mattered. They knew exactly one thing about him — he struggled with addiction. And that single fact was enough to erase everything else.</p>

        <div className={styles.pullQuote}>
          <p>Nick was Uncle Nick. Those couple of Christmases when the kids came home from their dad's house with clean clothes and full bellies? I thought that was Chris finally stepping up. It wasn't. That was Nick — quietly making sure those boys had what they needed without once taking credit for it.</p>
        </div>

        <p>And all that time, I was judging him myself.</p>

        <div className={styles.sectionHeader}><h2>The Parallel Descent</h2></div>

        <p>Before Nick, before the phone call, before any of this — there was Chris. My husband. The father of my children. The man I was still very much married to and building a life with when everything started to unravel.</p>
        <p>In 2016, while we were still together, I became pregnant with our second son, Carter. The pregnancy was unexpected, coming after a diagnosis of early-stage cervical cancer. What should have been a season of hope became something else entirely — because my pregnancy seemed to coincide with Chris's path into addiction.</p>
        <p>Towards the end of my third trimester, my husband made an earth-shattering confession. A "little blue pill" he didn't remember the name of. Something with an "F."</p>
        <p>I had no idea what fentanyl was.</p>
        <p>Over the course of the next twelve months, I watched my husband transform. I watched him spiral without any way to make him stop. And the more he spiraled, the more I did too.</p>

        <p className={styles.emphasisP}>But the difference? My vice was legal.</p>

        <p>It started the way it always starts — a drink at night to take the edge off. Just one. A glass of wine after the boys went to bed. Meanwhile, I was calling my husband a junkie for the pills I found in his pockets. All the while, my one drink a night was quietly becoming two. Then three. Then four. Then five.</p>

        <blockquote className={styles.dialogue}>
          <p>"Why would you want to be a filthy drug addict?" I'd say during fights.</p>
          <p>He'd look at me — confused. Like we spoke different languages.</p>
          <p>"You're a drunk," he'd reply.</p>
        </blockquote>

        <div className={styles.pullQuote}>
          <p>I had drawn the line — and in doing so, I'd drawn the same line the whole world uses: Your substance is acceptable; yours is not. Your pain is valid; yours is a choice. Your struggle deserves compassion; yours deserves contempt.</p>
        </div>

        <div className={styles.sectionHeader}><h2>The Last Video</h2></div>

        <p>That following New Year's Eve, I was lucky enough to capture a video of our son taking his very first steps. His dad smiling and cheering him on, just as a proud, loving father would.</p>
        <p>It is the last photo or video I have of the man I married.</p>
        <p>What followed was years of single motherhood, survival mode, and a wine glass that never seemed to empty. By the time I realized I wasn't coping anymore — that I was just drowning slower — the line between his addiction and mine had disappeared completely.</p>

        <div className={styles.sectionBreak}>— — —</div>

        <p className={styles.emphasisP}>Just. Stop. Ruining. Our. Lives.</p>
        <p>That's what I believed. That's what I'd been taught to believe — that addiction was a choice, a moral failure, a selfish act committed by weak people who just didn't love you enough to stop.</p>

        <div className={styles.sectionHeader}><h2>The Breaking Point</h2></div>

        <p>I don't know exactly when the drinking stopped being something I did and became something I couldn't stop doing. Those transitions don't announce themselves. One day you're coping. The next day you're depending. And somewhere after that, you're drowning — and you don't remember when the water rose above your head.</p>
        <p>What I do know is that the drinking nearly killed me. Not figuratively. Literally. I ended up in a hospital bed, shaking, delirious, my body in full withdrawal. Delirium tremens — the kind of withdrawal that can kill you.</p>
        <p>That was three years ago. I've been sober ever since.</p>
        <p>And now I watch my dad drown himself in the same thing that nearly drowned me.</p>

        <div className={styles.sectionHeader}><h2>The Person Who Stayed</h2></div>

        <p>And the person who gave me the courage to fight through the shaking and the terror and the humiliation of finally seeing myself clearly? It was Nick.</p>
        <p>He sat with me. He understood me — not with pity, but with recognition. He didn't give me a speech. He just pulled up a chair, looked me in the eyes while my whole body was shaking, and said, <em>"I know. I know exactly what this feels like."</em> And for the first time in years, someone did.</p>
        <p>He just stayed.</p>

        <div className={styles.callout}>
          <p>And if it weren't for that — if it weren't for the unexpected, undeserved empathy I received from the very person I had been taught to look down on — I would have killed myself drinking. The "piece of shit" saved my life.</p>
        </div>

        <div className={styles.sectionHeader}><h2>The Shift</h2></div>

        <p>I was standing over my dad's hospital bed. He was moaning in pain, barely coherent, and the only words he could manage were the same ones, over and over:</p>
        <blockquote className={styles.dialogue}>
          <p>"I'm so fucked... I'm so fucked..."</p>
        </blockquote>
        <p>And I rolled my eyes.</p>
        <p>Instinctively. Automatically. The way I'd been trained to respond. And then I caught myself. Standing over my father's broken body, watching him moan in a hospital bed, and my first reflex was contempt. Not compassion. Contempt.</p>
        <p>I stopped. I bent down. I spread my arms across him and laid my head against his stomach and I said: <em>"It's okay, Dad. I've got you. We're not fucked — as long as we keep fighting together."</em></p>
        <p>He calmed. His breathing slowed. And I wept.</p>

        <div className={styles.pullQuote}>
          <p>The question stops being "Why won't they just stop?" and becomes something harder, something truer: "What if the way I've been loving them is part of the problem?"</p>
        </div>

        <div className={styles.sectionHeader}><h2>The Answer We Already Have</h2></div>

        <p>I'm not saying boundaries don't matter. I'm not saying let someone burn your life down and smile while they do it. I'm saying there is a vast, unexplored territory between enabling and abandoning — and almost nobody is teaching us how to live there.</p>
        <p>Stop calling them junkies. Stop calling them pieces of shit. Stop pretending that the line between you and them is anything other than luck, and circumstance, and which aisle of the store your coping mechanism happens to be sold in.</p>

        <div className={styles.pullQuote}>
          <p>This isn't a call to fix anyone. It's a call to stay. To choose, again and again, the harder love — the kind that doesn't come with conditions or timelines or the promise that it will work.</p>
        </div>

        <div className={styles.sectionBreak}>✦ &nbsp; ✦ &nbsp; ✦</div>

        <p>My name is Britne D Link. I am three years sober. I was the drunk who called her husband a junkie. I was the woman who judged Nick before she knew him and needed him before she deserved him. I am the daughter weeping on her father's stomach in a hospital room, choosing presence over contempt.</p>
        <p>If any of this sounds familiar, you are not alone. And if you're standing over someone you love right now, trying to decide whether to roll your eyes or lay your head down — I hope you lay your head down.</p>

        <p className={styles.emphasisP}>The gap between you and them is smaller than you think.</p>

        <div className={styles.sectionBreak}>— — —</div>

        <p>And then — while I was writing this — my phone buzzed. A text from my mother:</p>

        <div className={styles.callout}>
          <p>"He's sober right now.. it might be a good chance to tell him how you feel."</p>
        </div>

        <p>That text won't fix my dad. It won't undo the years of screaming or the lines she drew. But it's something that didn't exist before. A crack in the old playbook. A twelve-word proof that people can change — not through lectures, but through the slow, brutal, humbling experience of learning that the thing you swore would never touch your family was already there.</p>

        <p className={styles.emphasisP}>It was always there.</p>

        <div className={styles.authorBio}>
          <div className={styles.authorAccent} />
          <div>
            <div className={styles.authorLabel}>About the Author</div>
            <div className={styles.authorName}>Britne D Link</div>
            <p className={styles.authorDesc}>Britne D Link is the founder of <em>The Missing Guides</em>, a resource for people navigating life's hardest chapters — the ones nobody prepares you for. She is a U.S. Army veteran, a mother of two boys, and three years sober.</p>
          </div>
        </div>
      </main>
    </>
  )
}
