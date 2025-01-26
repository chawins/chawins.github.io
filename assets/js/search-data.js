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
        },{id: "post-a-post-with-image-galleries",
      
        title: "a post with image galleries",
      
      description: "this is what included image galleries could look like",
      section: "Posts",
      handler: () => {
        
          window.location.href = "/sample-posts/2024/12/04/photo-gallery.html";
        
      },
    },{id: "news-i-was-fortunate-to-intern-at-ibm-research-yorktown-heights-ny-over-the-summer-of-2019-and-to-be-mentored-by-supriyo-chakraborty",
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
        id: 'social-email',
        title: 'email',
        section: 'Socials',
        handler: () => {
          window.open("mailto:%79%6F%75@%65%78%61%6D%70%6C%65.%63%6F%6D", "_blank");
        },
      },{
        id: 'social-inspire',
        title: 'Inspire HEP',
        section: 'Socials',
        handler: () => {
          window.open("https://inspirehep.net/authors/1010907", "_blank");
        },
      },{
        id: 'social-rss',
        title: 'RSS Feed',
        section: 'Socials',
        handler: () => {
          window.open("/feed.xml", "_blank");
        },
      },{
        id: 'social-scholar',
        title: 'Google Scholar',
        section: 'Socials',
        handler: () => {
          window.open("https://scholar.google.com/citations?user=qc6CJjYAAAAJ", "_blank");
        },
      },{
        id: 'social-custom_social',
        title: 'Custom_social',
        section: 'Socials',
        handler: () => {
          window.open("https://www.alberteinstein.com/", "_blank");
        },
      },];
