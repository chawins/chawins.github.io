// get the ninja-keys element
const ninja = document.querySelector('ninja-keys');

// add the home and posts menu items
ninja.data = [{
    id: "nav-about",
    title: "about",
    section: "Navigation",
    handler: () => {
      window.location.href = "/";
    },
  },{id: "nav-publications",
          title: "publications",
          description: "publications by categories in reversed chronological order.* = equal contribution.",
          section: "Navigation",
          handler: () => {
            window.location.href = "/publications/";
          },
        },{id: "nav-llm-sp",
          title: "llm-sp",
          description: "A growing collection of LLM security and privacy papers.",
          section: "Navigation",
          handler: () => {
            window.location.href = "/llm-sp/";
          },
        },{id: "nav-services",
          title: "services",
          description: "",
          section: "Navigation",
          handler: () => {
            window.location.href = "/service/";
          },
        },{id: "post-a-post-with-plotly-js",
        
          title: "a post with plotly.js",
        
        description: "this is what included plotly.js code could look like",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/sample-posts/2025/03/26/plotly.html";
          
        },
      },{id: "post-a-post-with-image-galleries",
        
          title: "a post with image galleries",
        
        description: "this is what included image galleries could look like",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/sample-posts/2024/12/04/photo-gallery.html";
          
        },
      },{id: "books-the-godfather",
          title: 'The Godfather',
          description: "",
          section: "Books",handler: () => {
              window.location.href = "/books/the_godfather.html";
            },},{id: "news-i-was-fortunate-to-intern-at-ibm-research-yorktown-heights-ny-over-the-summer-of-2019-and-to-be-mentored-by-supriyo-chakraborty",
          title: 'I was fortunate to intern at IBM Research (Yorktown Heights, NY) over the...',
          description: "",
          section: "News",},{id: "news-our-project-was-awarded-a-grant-from-center-for-long-term-cybersecurity-cltc-for-2021",
          title: 'Our project was awarded a grant from Center for Long-Term Cybersecurity (CLTC) for...',
          description: "",
          section: "News",},{id: "news-our-paper-mitigating-adversarial-training-instability-with-batch-normalization-will-appear-at-iclr-2021-workshop-on-security-and-safety-in-machine-learning-systems-this-work-is-led-by-arvind-sridhar-an-undergraduate-student-i-mentor-at-uc-berkeley-paper",
          title: 'Our paper, Mitigating Adversarial Training Instability with Batch Normalization, will appear at ICLR...',
          description: "",
          section: "News",},{id: "news-i-interned-at-nokia-bell-labs-remote-and-was-very-fortunate-to-be-mentored-by-anwar-walid",
          title: 'I interned at Nokia Bell Labs (remote) and was very fortunate to be...',
          description: "",
          section: "News",},{id: "news-our-paper-improving-the-accuracy-robustness-trade-off-for-dual-domain-adversarial-training-will-appear-at-icml-2021-workshop-on-uncertainty-amp-amp-robustness-in-deep-learning-paper",
          title: 'Our paper, Improving the Accuracy-Robustness Trade-Off for Dual-Domain Adversarial Training, will appear at...',
          description: "",
          section: "News",},{id: "news-our-project-on-large-scale-adversarial-patch-benchmark-is-funded-by-microsoft-bair-commons",
          title: 'Our project on large-scale adversarial patch benchmark is funded by Microsoft-BAIR Commons.',
          description: "",
          section: "News",},{id: "news-our-paper-sat-improving-adversarial-training-via-curriculum-based-loss-smoothing-will-appear-at-aisec-2021-paper-slides",
          title: 'Our paper, SAT: Improving Adversarial Training via Curriculum-Based Loss Smoothing, will appear at...',
          description: "",
          section: "News",},{id: "news-our-paper-adversarial-examples-for-k-nearest-neighbor-classifiers-based-on-higher-order-voronoi-diagrams-will-appear-at-neurips-2021-paper-slides",
          title: 'Our paper, Adversarial Examples for k-Nearest Neighbor Classifiers Based on Higher-Order Voronoi Diagrams,...',
          description: "",
          section: "News",},{id: "news-i-am-starting-at-google-research-as-a-part-time-student-researcher-mentored-by-nicholas-carlini",
          title: 'I am starting at Google Research as a part-time student researcher, mentored by...',
          description: "",
          section: "News",},{id: "news-our-paper-demystifying-the-adversarial-robustness-of-random-transformation-defenses-is-selected-as-one-of-the-three-best-papers-at-aaai-2022-advml-workshop-paper-slides",
          title: 'Our paper, Demystifying the Adversarial Robustness of Random Transformation Defenses, is selected as...',
          description: "",
          section: "News",},{id: "news-i-will-be-interning-at-google-research-during-summer-2022-hosted-by-ali-zand-and-david-tao",
          title: 'I will be interning at Google Research during Summer 2022, hosted by Ali...',
          description: "",
          section: "News",},{id: "news-our-paper-demystifying-the-adversarial-robustness-of-random-transformation-defenses-will-appear-at-icml-2022",
          title: 'Our paper, Demystifying the Adversarial Robustness of Random Transformation Defenses, will appear at...',
          description: "",
          section: "News",},{
        id: 'social-bluesky',
        title: 'Bluesky',
        section: 'Socials',
        handler: () => {
          window.open("https://bsky.app/profile/chawins.bsky.social", "_blank");
        },
      },{
        id: 'social-email',
        title: 'email',
        section: 'Socials',
        handler: () => {
          window.open("mailto:%63%68%61%77%69%6E.%73%69%74%61%77%61%72%69%6E@%67%6D%61%69%6C.%63%6F%6D", "_blank");
        },
      },{
        id: 'social-github',
        title: 'GitHub',
        section: 'Socials',
        handler: () => {
          window.open("https://github.com/chawins", "_blank");
        },
      },{
        id: 'social-linkedin',
        title: 'LinkedIn',
        section: 'Socials',
        handler: () => {
          window.open("https://www.linkedin.com/in/chawins", "_blank");
        },
      },{
        id: 'social-scholar',
        title: 'Google Scholar',
        section: 'Socials',
        handler: () => {
          window.open("https://scholar.google.com/citations?user=AxUAEQ4AAAAJ", "_blank");
        },
      },{
        id: 'social-x',
        title: 'X',
        section: 'Socials',
        handler: () => {
          window.open("https://twitter.com/csitawarin", "_blank");
        },
      },];
