# **Biodigital Chronobiology: Reconstructing the Temporal Niches of Extinct Species within the Extinction Archive**

The "Extinction Archive" represents a transformative shift in conservation biology, moving beyond the static preservation of biological remains toward the active reconstruction of lost sensory and temporal experiences.1 By merging chronobiology—the study of biological rhythms—with generative AI, researchers can restore the daily and seasonal "temporal phenotypes" of species that have long vanished.2 This synthesis is grounded in the understanding that life is fundamentally rhythmic, governed by endogenous clocks evolved to anticipate cycles of light and temperature driven by the Earth’s rotation.3 When a species is lost, its unique partitioning of time—its waking moments, migration durations, and social pulses—is erased from the ecological symphony.5

## **Theoretical Framework of Palaeo-Chronobiology and the Temporal Niche**

To reconstruct the temporal life of an extinct species, one must establish a foundation in circadian rhythms—self-sustained cycles of approximately 24 hours that persist even without environmental cues.7 In the Extinction Archive, these rhythms are inferred through ancient genomics, fossil morphology, and isotopic records.8

### **The Evolution of Intrinsic Timekeepers across Deep Time**

Life on Earth evolved under cyclic light-dark conditions due to the planet's rotation.2 A significant challenge in palaeo-chronobiology is accounting for historical variations in Earth's rotation. For instance, during the "Boring Billion" (Proterozoic Epoch), the solar day was stalled at approximately 19 hours due to tidal resonance.11 This implies that ancient circadian systems, such as those in ancestral cyanobacteria, were synchronized to much faster cycles than the modern 24-hour day.11

| Epoch/Period | Solar Day Duration | Dominant Rhythmic Adaptation |
| :---- | :---- | :---- |
| Proterozoic (2.5 \- 0.5 Ga) | ![][image1] 18-20 hours | Ancestral Kai-protein oscillators in cyanobacteria 13 |
| Permian (298 \- 252 Ma) | ![][image1] 22-23 hours | Early mammalian ancestors; longer circadian cycles 14 |
| Mesozoic (252 \- 66 Ma) | ![][image1] 23-23.5 hours | Avian ancestors; shorter circadian cycles evolved 14 |
| Cenozoic to Present | 24 hours | Standardized mammalian and modern avian clocks 15 |

The acceleration of the Earth's rotation, potentially influenced by meteorite impacts at the end of the Permian, may have created a "circadian mismatch" for surviving lineages.14

### **The Nocturnal Bottleneck**

The "nocturnal bottleneck" hypothesis posits that early placental mammals were restricted to nighttime niches for millions of years to avoid competition and predation from dominant diurnal dinosaurs.17 This forced nocturnality led to radical adaptations in mammalian visual and circadian systems, including the development of a single retinal photic input pathway to the circadian pacemaker.17

## **Molecular Mechanisms: Genomic Reconstruction**

The Extinction Archive utilizes ancient DNA (aDNA) to identify mutations in core clock genes, providing a blueprint for how extinct species perceived time.18

### **Arctic Adaptations in the Woolly Mammoth**

The Woolly Mammoth (*Mammuthus primigenius*) inhabited extreme Arctic environments with intense seasonal photoperiod shifts.19 Comparative genomic analysis has identified mammoth-specific variants in genes like *PER2* and *BMAL1*.21

| Gene | Function | Mammoth Mutation Significance |
| :---- | :---- | :---- |
| *PER2* | Mediates response to light/temp cycles | Facilitated adaptation to extreme Arctic photoperiods 8 |
| *TRPV3* | Temperature sensation and hair growth | Reduced heat sensitivity; encouraged shaggy coat development 21 |
| *RNase L* | Antiviral defense and immunity | High copy numbers (up to 9x) improved pathogen resistance 21 |
| *SCN10A* | Sensory perception of extreme cold | Enabled perception of intense cold as a survival signal 20 |

These mutations suggest the mammoth’s clock was highly flexible, potentially more attuned to metabolic and temperature cues than the solar cycle.23

### **Hominin Chronotypes**

Study of Neanderthal and Denisovan genomes reveals variants in circadian genes such as *CLOCK* and *RORB*.24 Introgressed Neanderthal DNA in modern humans is consistently linked to "morningness"—the propensity to be an early riser—likely enabling ancestral humans to align sleep cycles with highly variable European seasonal patterns.25

## **Morphological Correlates: Skeletal and Retinal Analysis**

Where DNA is degraded, the archive relies on morphological correlates in the fossil record to infer activity patterns.9

### **The Bony Orbit and Visual Sensitivity**

In mammals, bony orbit dimensions are reliable predictors of diel activity patterns (DAP), relating directly to light sensitivity.9 For example, nocturnal species often have relatively larger eyes to maximize photon capture.9 For the Thylacine (*Thylacinus cynocephalus*), historical and skeletal data indicate a crepuscular or nocturnal hunter.27

### **Retinal Ganglion Cell (RGC) Density**

Neuro-computational techniques allow for the linear reconstruction of natural images from RGC population responses.29 Different RGC types convey distinct visual features such as edges, textures, and movement.31 By modeling RGC distribution based on orbital anatomy and closest living relatives, AI can generate a "first-person" video stream of an extinct animal's experience.32

## **Isotopic Biogeography: Seasonal Life Histories**

Stable isotope analysis tracks the movement of organisms through time and space.34

### **Incremental Tusk Growth**

Mammoth tusks grew in daily layers, analogous to tree rings.35 Isotopes like Strontium (![][image2]) and Oxygen (![][image3]) preserved in these layers provide a chemical fingerprint of geology and climate.35 The 28-year life of the mammoth "Kik" was reconstructed using an isotope-guided random walk model, revealing he traveled nearly 70,000 kilometers, with seasonal movements between the Alaskan interior and the North Slope.35

## **Case Study: The Passenger Pigeon**

The Passenger Pigeon (*Ectopistes migratorius*) offers a dramatic example of a social temporal niche.37

* **Synchronicity:** Flocks were so dense they described as "feathered eclipses" that darkened the sky for days.39  
* **Movement:** They flew at speeds around 60 mph, relying on massive flocking for predator satiation and efficient foraging.38  
* **Social Collapse:** Their extinction was not just a loss of numbers but a collapse of temporal synchrony; once populations fell below a threshold, the social cues for mass nesting vanished.38

## **AI-Driven Sensory Reconstruction and Sonification**

The Extinction Archive uses AI to translate fragmented data into immersive sound and vision.32

### **Generative Video and Motion**

Diffusion-based multimodal models create dynamic visual scenes guided by textual ethological prompts and visual habitat anchors.32 This enables "digital twins" that animate based on biomechanical constraints, simulating a mammoth's slow, ground-level grazing gait.32

### **Bioacoustic Restoration**

AI models like **Perch** (Google DeepMind) and **ECOGEN** are used to identify and generate life-like animal vocalizations.42 ECOGEN uses spectrogram-to-spectrogram translation to create synthetic songs for species with scarce recordings, allowing the archive to "restore" the calls of the Passenger Pigeon.42

### **Sonification of Rhythms**

The "Biorhythm Composer" concept sonifies non-acoustic data like gene sequences or migration patterns.1 Mapping data to musical parameters (pitch, timbre, tempo) allows users to "hear" complex patterns.44 For example, mapping a mammoth’s Arctic clock period to pitch frequency turns molecular data into a visceral experience of adaptation.46

## **Technical Implementation and Strategy**

Realized as an interactive Web AR installation for the 2026 Biodesign Challenge.1

* **WebXR Framework:** Built using **A-Frame** and **Three.js** to make immersive experiences accessible in-browser.47  
* **Interactivity:** The use of **ar-hit-test** positions 3D extinct animals in the user's real world 49, while the **Web Audio API** enables real-time synthesis of biological oscillators.50  
* **BDC Strategy:** To target the **Biodigital Excellence** prize, the project ensures both biological data (aDNA, isotopes) and digital code (AI, sonification) are "load-bearing" and essential.1

## **Ethical Considerations**

Digital de-extinction addresses the "moral obligation" to repair anthropogenic damage 52 without the risks of physical resurrection, such as the suffering of isolated social animals.53 However, the "moral hazard" remains—digital archives might diminish the urgency of current conservation if extinction is perceived as "reversible".53 The archive mitigates this by highlighting the tragedy of the last individuals and maintaining transparency about AI speculation.55

## **Conclusion**

The silencing of a single species is the loss of a unique temporal masterpiece. By integrating molecular clocks, seasonal treks, and social pulses, the Extinction Archive restores the rhythms of the past as a guide for the future.1

#### **Works cited**

1. BDC\_2026\_Ideation\_Guide\_AI\_Assisted.docx  
2. A chronology of chronobiology \- The Physiological Society, accessed April 1, 2026, [https://www.physoc.org/magazine-articles/a-chronology-of-chronobiology/](https://www.physoc.org/magazine-articles/a-chronology-of-chronobiology/)  
3. Introduction to Chronobiology \- PMC \- NIH, accessed April 1, 2026, [https://pmc.ncbi.nlm.nih.gov/articles/PMC6120700/](https://pmc.ncbi.nlm.nih.gov/articles/PMC6120700/)  
4. The Inner Workings of an Ancient Biological Clock \- PMC, accessed April 1, 2026, [https://pmc.ncbi.nlm.nih.gov/articles/PMC10939747/](https://pmc.ncbi.nlm.nih.gov/articles/PMC10939747/)  
5. Chronobiology \- Wikipedia, accessed April 1, 2026, [https://en.wikipedia.org/wiki/Chronobiology](https://en.wikipedia.org/wiki/Chronobiology)  
6. Chronobiology of interspecific interactions in a changing world \- PMC, accessed April 1, 2026, [https://pmc.ncbi.nlm.nih.gov/articles/PMC5647275/](https://pmc.ncbi.nlm.nih.gov/articles/PMC5647275/)  
7. Circadian rhythms revealed: unraveling the genetic, physiological, and behavioral tapestry of the human biological clock and rhythms \- Frontiers, accessed April 1, 2026, [https://www.frontiersin.org/journals/sleep/articles/10.3389/frsle.2025.1544945/full](https://www.frontiersin.org/journals/sleep/articles/10.3389/frsle.2025.1544945/full)  
8. Elephantid genomes reveal the molecular bases of Woolly Mammoth adaptations to the arctic \- bioRxiv, accessed April 1, 2026, [https://www.biorxiv.org/content/10.1101/018366v1.full.pdf](https://www.biorxiv.org/content/10.1101/018366v1.full.pdf)  
9. Do Bony Orbit Dimensions Predict Diel Activity Pattern in Sciurid Rodents? \- PubMed, accessed April 1, 2026, [https://pubmed.ncbi.nlm.nih.gov/30369077/](https://pubmed.ncbi.nlm.nih.gov/30369077/)  
10. Tracking a woolly mammoth \- UW Biostatistics \- University of Washington, accessed April 1, 2026, [https://www.biostat.washington.edu/news/stories/tracking-woolly-mammoth](https://www.biostat.washington.edu/news/stories/tracking-woolly-mammoth)  
11. A Day on Earth Used to Only Be 19 Hours \- Universe Today, accessed April 1, 2026, [https://www.universetoday.com/articles/a-day-on-earth-used-to-only-be-19-hours](https://www.universetoday.com/articles/a-day-on-earth-used-to-only-be-19-hours)  
12. Research team traces evolutionary history of bacterial circadian clock on ancient Earth, accessed April 1, 2026, [https://www.sciencedaily.com/releases/2025/05/250520012730.htm](https://www.sciencedaily.com/releases/2025/05/250520012730.htm)  
13. Origin and evolution of circadian clock genes in prokaryotes \- PNAS, accessed April 1, 2026, [https://www.pnas.org/doi/10.1073/pnas.0130099100](https://www.pnas.org/doi/10.1073/pnas.0130099100)  
14. Paleontology of Circadian Rhythm Disorders \- Remedy Publications LLC, accessed April 1, 2026, [https://www.remedypublications.com/open-access/paleontology-of-circadian-rhythm-disorders-126.pdf](https://www.remedypublications.com/open-access/paleontology-of-circadian-rhythm-disorders-126.pdf)  
15. An Introduction to Chronobiology Part I \- The BioClock Studio, accessed April 1, 2026, [https://bioclock.ucsd.edu/portfolio-item/an-introduction-to-chronobiology-part-i/](https://bioclock.ucsd.edu/portfolio-item/an-introduction-to-chronobiology-part-i/)  
16. accessed April 1, 2026, [https://openresearch.surrey.ac.uk/view/delivery/44SUR\_INST/12139666070002346/13140581690002346](https://openresearch.surrey.ac.uk/view/delivery/44SUR_INST/12139666070002346/13140581690002346)  
17. The nocturnal bottleneck and the evolution of activity patterns in ..., accessed April 1, 2026, [https://pmc.ncbi.nlm.nih.gov/articles/PMC3712437/](https://pmc.ncbi.nlm.nih.gov/articles/PMC3712437/)  
18. Ancient DNA and Neanderthals | The Smithsonian Institution's Human Origins Program, accessed April 1, 2026, [https://humanorigins.si.edu/evidence/genetics/ancient-dna-and-neanderthals](https://humanorigins.si.edu/evidence/genetics/ancient-dna-and-neanderthals)  
19. Evolutionary adaptation revealed by comparative genome analysis of woolly mammoths and elephants \- PMC, accessed April 1, 2026, [https://pmc.ncbi.nlm.nih.gov/articles/PMC5737375/](https://pmc.ncbi.nlm.nih.gov/articles/PMC5737375/)  
20. Measuring Mammoth Mutations | The Scientist, accessed April 1, 2026, [https://www.the-scientist.com/measuring-mammoth-mutations-71436](https://www.the-scientist.com/measuring-mammoth-mutations-71436)  
21. What genetic mutations enabled woolly mammoths to survive in the Arctic? \- Consensus, accessed April 1, 2026, [https://consensus.app/search/what-genetic-mutations-enabled-woolly-mammoths-to-/Vj1zBXaASGSpGgOipJKrBg/](https://consensus.app/search/what-genetic-mutations-enabled-woolly-mammoths-to-/Vj1zBXaASGSpGgOipJKrBg/)  
22. Landmark genetic analysis identifies how woolly mammoth adapted to arctic life, accessed April 1, 2026, [https://news.uchicago.edu/story/landmark-genetic-analysis-identifies-how-woolly-mammoth-adapted-arctic-life](https://news.uchicago.edu/story/landmark-genetic-analysis-identifies-how-woolly-mammoth-adapted-arctic-life)  
23. accessed April 1, 2026, [https://pmc.ncbi.nlm.nih.gov/articles/PMC5737375/\#:\~:text=These%20adaptations%20are%20possibly%20due,(0.98%20FST%20rank).](https://pmc.ncbi.nlm.nih.gov/articles/PMC5737375/#:~:text=These%20adaptations%20are%20possibly%20due,\(0.98%20FST%20rank\).)  
24. Archaic Introgression Shaped Human Circadian Traits \- PMC \- NIH, accessed April 1, 2026, [https://pmc.ncbi.nlm.nih.gov/articles/PMC9915721/](https://pmc.ncbi.nlm.nih.gov/articles/PMC9915721/)  
25. Were Neanderthals morning people ? | EurekAlert\!, accessed April 1, 2026, [https://www.eurekalert.org/news-releases/1010485](https://www.eurekalert.org/news-releases/1010485)  
26. Mammalian retinal specializations for high acuity vision evolve in response to both foraging strategies and morphological constraints \- PMC, accessed April 1, 2026, [https://pmc.ncbi.nlm.nih.gov/articles/PMC11968189/](https://pmc.ncbi.nlm.nih.gov/articles/PMC11968189/)  
27. Thylacine | Encyclopaedia of Cryptozoology \- Fandom, accessed April 1, 2026, [https://cryptidarchives.fandom.com/wiki/Thylacine](https://cryptidarchives.fandom.com/wiki/Thylacine)  
28. How AI is helping advance the science of bioacoustics to save endangered species, accessed April 1, 2026, [https://deepmind.google/blog/how-ai-is-helping-advance-the-science-of-bioacoustics-to-save-endangered-species/](https://deepmind.google/blog/how-ai-is-helping-advance-the-science-of-bioacoustics-to-save-endangered-species/)  
29. Reconstruction of natural images from responses of primate retinal ganglion cells \- PMC, accessed April 1, 2026, [https://pmc.ncbi.nlm.nih.gov/articles/PMC7752138/](https://pmc.ncbi.nlm.nih.gov/articles/PMC7752138/)  
30. Reconstruction of natural images from responses of primate retinal ganglion cells \- eLife, accessed April 1, 2026, [https://elifesciences.org/articles/58516.pdf](https://elifesciences.org/articles/58516.pdf)  
31. Reconstruction of natural images from responses of primate retinal ganglion cells \- eLife, accessed April 1, 2026, [https://elifesciences.org/articles/58516](https://elifesciences.org/articles/58516)  
32. Seeing the world as animals do: How to leverage generative AI for ecological neuroscience, accessed April 1, 2026, [https://www.thetransmitter.org/artificial-intelligence/seeing-the-world-as-animals-do-how-to-leverage-generative-ai-for-ecological-neuroscience/](https://www.thetransmitter.org/artificial-intelligence/seeing-the-world-as-animals-do-how-to-leverage-generative-ai-for-ecological-neuroscience/)  
33. Reconstruction of natural images from responses of primate retinal ganglion cells | bioRxiv, accessed April 1, 2026, [https://www.biorxiv.org/content/10.1101/2020.05.04.077693v2.full?%3Fcollection=](https://www.biorxiv.org/content/10.1101/2020.05.04.077693v2.full??collection)  
34. P ost Lab Research: Stable Isotopes \- Yale University, accessed April 1, 2026, [https://postlab.yale.edu/post-lab-research-stable-isotopes](https://postlab.yale.edu/post-lab-research-stable-isotopes)  
35. How Scientists Tracked the Movements of a 17,000-Year-Old Woolly Mammoth, accessed April 1, 2026, [https://www.smithsonianmag.com/science-nature/scientists-tracked-movements-17000-year-old-woolly-mammoth-180983064/](https://www.smithsonianmag.com/science-nature/scientists-tracked-movements-17000-year-old-woolly-mammoth-180983064/)  
36. This mammoth overlapped with the earliest human settlers of Alaska. Its tusk tells an important story \- ZME Science, accessed April 1, 2026, [https://www.zmescience.com/science/this-mammoth-overlapped-with-the-earliest-human-settlers-of-alaska-its-tusk-tells-an-important-story/](https://www.zmescience.com/science/this-mammoth-overlapped-with-the-earliest-human-settlers-of-alaska-its-tusk-tells-an-important-story/)  
37. Flocks that Darken the Heavens: The Passenger Pigeon in Indiana, accessed April 1, 2026, [https://blog.history.in.gov/flocks-that-darken-the-heavens-the-passenger-pigeon-in-indiana/](https://blog.history.in.gov/flocks-that-darken-the-heavens-the-passenger-pigeon-in-indiana/)  
38. Passenger Pigeon | Burpee Museum of Natural History, accessed April 1, 2026, [https://burpee.org/passenger-pigeon/](https://burpee.org/passenger-pigeon/)  
39. De-extinction Could Reverse Species Loss. But Should We Do It? \- Cal Alumni Association, accessed April 1, 2026, [https://alumni.berkeley.edu/california-magazine/fall-2021/deextinction-revive-ancient-endangered-species-woolly-mammoths-passenger-pigeons/](https://alumni.berkeley.edu/california-magazine/fall-2021/deextinction-revive-ancient-endangered-species-woolly-mammoths-passenger-pigeons/)  
40. The Case for Bringing Back the Passenger Pigeon \- Nautilus, accessed April 1, 2026, [https://nautil.us/the-case-for-bringing-back-the-passenger-pigeon-236217](https://nautil.us/the-case-for-bringing-back-the-passenger-pigeon-236217)  
41. Natural History \- University Digital Conservancy, accessed April 1, 2026, [https://conservancy.umn.edu/bitstreams/af2859af-3632-4d1a-8a62-cc1c0eca1fe5/download](https://conservancy.umn.edu/bitstreams/af2859af-3632-4d1a-8a62-cc1c0eca1fe5/download)  
42. New deep learning AI tool helps ecologists monitor rare birds through their songs, accessed April 1, 2026, [https://nserc-crsng.canada.ca/en/new-deep-learning-ai-tool-helps-ecologists-monitor-rare-birds-through-their-songs](https://nserc-crsng.canada.ca/en/new-deep-learning-ai-tool-helps-ecologists-monitor-rare-birds-through-their-songs)  
43. (PDF) Animal acoustic identification, denoising and source separation using generative adversarial networks \- ResearchGate, accessed April 1, 2026, [https://www.researchgate.net/publication/395195587\_Animal\_acoustic\_identification\_denoising\_and\_source\_separation\_using\_generative\_adversarial\_networks](https://www.researchgate.net/publication/395195587_Animal_acoustic_identification_denoising_and_source_separation_using_generative_adversarial_networks)  
44. Metrics sonification as a new way to convey bibliometric data \- Leiden Madtrics, accessed April 1, 2026, [https://www.leidenmadtrics.nl/articles/metrics-sonification-as-a-new-way-to-convey-bibliometric-data](https://www.leidenmadtrics.nl/articles/metrics-sonification-as-a-new-way-to-convey-bibliometric-data)  
45. The sound of science: Data sonification has emerged as possible alternative to data visualization \- PMC, accessed April 1, 2026, [https://pmc.ncbi.nlm.nih.gov/articles/PMC11387736/](https://pmc.ncbi.nlm.nih.gov/articles/PMC11387736/)  
46. The sound of science: UK researchers translate biology into music | UKNow \- University of Kentucky, accessed April 1, 2026, [https://uknow.uky.edu/research/sound-science-uk-researchers-translate-biology-music](https://uknow.uky.edu/research/sound-science-uk-researchers-translate-biology-music)  
47. Introduction \- A-Frame, accessed April 1, 2026, [https://aframe.io/docs/](https://aframe.io/docs/)  
48. Aframe \- Three.js Resources, accessed April 1, 2026, [https://threejsresources.com/tool/aframe](https://threejsresources.com/tool/aframe)  
49. Making an AR Game. AFRAME, THREE.js and WebXR let me build… | by Ada Rose Cannon | Samsung Internet Developers | Medium, accessed April 1, 2026, [https://medium.com/samsung-internet-dev/making-an-ar-game-with-aframe-529e03ae90cb](https://medium.com/samsung-internet-dev/making-an-ar-game-with-aframe-529e03ae90cb)  
50. Exploring Dataset Sonification with Web Audio \- aleksati.net, accessed April 1, 2026, [https://aleksati.net/posts/exploring-dataset-sonification-with-web-audio](https://aleksati.net/posts/exploring-dataset-sonification-with-web-audio)  
51. artificial life in integrated interactive sonification and visualisation: initial experiments with a python-base, accessed April 1, 2026, [https://iil.is/pdf/2024\_icad\_armitage\_et\_al\_alife.pdf](https://iil.is/pdf/2024_icad_armitage_et_al_alife.pdf)  
52. Ethical Considerations of De-Extinction — Grounds \- The Virginia Journal of Bioethics, accessed April 1, 2026, [http://www.vabioethics.com/content/2025/2/11/ethical-considerations-of-de-extinction](http://www.vabioethics.com/content/2025/2/11/ethical-considerations-of-de-extinction)  
53. Anticipating risks, governance needs, and public perceptions of de-extinction \- NC State University, accessed April 1, 2026, [https://faculty.cnr.ncsu.edu/nilspeterson/wp-content/uploads/sites/17/2019/09/Valdez\_etal\_2019\_JRI.pdf](https://faculty.cnr.ncsu.edu/nilspeterson/wp-content/uploads/sites/17/2019/09/Valdez_etal_2019_JRI.pdf)  
54. Stanford's Hank Greely presents the ethics of resurrecting extinct species, accessed April 1, 2026, [https://law.stanford.edu/press/stanfords-hank-greely-presents-the-ethics-of-resurrecting-extinct-species-2/](https://law.stanford.edu/press/stanfords-hank-greely-presents-the-ethics-of-resurrecting-extinct-species-2/)  
55. ETHICAL CHALLENGES OF USING ADVANCED DIGITAL TECHNOLOGIES FOR THE PRESERVATION OF CULTURAL HERITAGE Dragica Krstić Denis Voki, accessed April 1, 2026, [https://chnt.at/wp-content/uploads/2024/08/Perkovic-\_364.pdf](https://chnt.at/wp-content/uploads/2024/08/Perkovic-_364.pdf)  
56. The ethics of species extinctions \- PMC \- NIH, accessed April 1, 2026, [https://pmc.ncbi.nlm.nih.gov/articles/PMC11895738/](https://pmc.ncbi.nlm.nih.gov/articles/PMC11895738/)

[image1]: <data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA0AAAAUCAYAAABWMrcvAAAAi0lEQVR4XmNgGAUDDDSBWBZdEBdQAOL/QPwPiL9B2WnICpAAJ4wBUowO9gPxbyCWQRP/DmN4IosiAWEg/ssAsRmGbVBUEAAs6AIg0MmAMG01mhxWcAKIm5H4MxkgmoOQxGCgHMboQRZFApcZIJpLgNgfiK8A8Q2YJBuMgQXwAfF8IL4GxClocsMGAACGPRrB9xR0NgAAAABJRU5ErkJggg==>

[image2]: <data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFMAAAAYCAYAAACGLcGvAAADfUlEQVR4Xu2YWchNURiGP/OQCykuzFOGKCTcKENJ5rGUpJQUIhRlyn8hlCGhiEyZEiJjSimKTKXkggy/WaYIyRDe11rrP9/5zj7n3/+2Dzfnqbez1rvW2evba6+99re3SInU6QS9gL5CPZV/D7oA7YZ2QNuh0ar9fzMXegW9hmqZttnQd+iU8YsOJyvwXJV/Qdegi+ImlZP9v6nhfwdA7ZXPWAPHoUHKH6/aikoz6JKqb4Vq+vIG5beB+qt6IeZAS6BWyuulykk5AlX35W3QKNWmJ1OXG6pyIepBa6GpUH3v6YsVGw7+A2on7qpGcdMaEWyGfopbNY2h/dAtcccPF+hvsJPE+m1oBjTU+7O8fxR6Ck3zfiEeQeVQB6gz9BJaKtnjxYark3+kNpo2wv2ytjUNK8TtUZbzkjAoQ0dxq12zQDJxh5W/y9cDb6Guqm55J9H7Ko/x2ZqV0RQ65MtjxR1kcKb5D3EmQ5+Qpg/0yZoJKDf1VVAPXz4gmRhXqjI5Ab1RdU1byX9uZ6BF1qyMO6bOfeKcqodVWwhmAOzTxTaIWxXzrZkA+/CzMe2F+kIDTdsxyb/CONH2OIHDkmBr4ol2V/Xe0BhVXy35Bwxw9YXbLWze+WCAPPEWvt4N2gM1qOiRywTJjol8MPXTqqzjfQJNVHUNVx/73rcNEfCuXazqXLXzVL2CK+KCuSzZT3CyDPpovCjCZAbx1mqe1cMRTpS/TLmmQK2VH0XUXkz40NwJPZPsTIPbDWPmXrhP+ZYmkhv3Vaia7iTujlsObZJMv7rQOol3IaoMD/5QcoNrpPr0E7fKCNvWq3KhyeTLQ7HgXflNcuPWhD3/oLg23l0Uy0wliwrfRnh7cbDwcCMj/e9k3xYHZgmJ8r0E6KxG7//hQURf792FtqZEzLSGgoNHraq7En8y4/arKmus4WGuzTEn2QZxfpk106TQybJtoTXF+eetGQHfSph8F4P31vBwv2R8HFvDFJJ+HeOnSr7JLJTD0edbUmWclOIEP0Lyx7ZTolOpLZL/P6kwXNwAN4zPvYQ+8z7LOIkfVNx+VeW6uGPblGmI98PHFA39L9ZME6YRLaHp4gaj+GTk+znTjij4/m5zxCj4nlxmzZQIF+msL/Ohwt/HFT1yYfs/+/qUNg+sUSI59vWxREKGSfa3yhJ/QRpfmUp4mCWUKFEiFX4DppjbtB8XV1MAAAAASUVORK5CYII=>

[image3]: <data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACcAAAAYCAYAAAB5j+RNAAABxUlEQVR4Xu2WPyhFcRTHDxYLKSnJ8IrBoBiUAUXJaFAmlBKjLGzKKBsZlE3JptiUrCZhYFEUJcnfCYM4X+f3y7nnHS/dbga9T31zf9/veb97vM793Uf0j6hjvVuTWWRds05s8FcssMZZH8afY5Wp9Yu6zpxRkgb2WP3JiHpCpjljNai1zQsxwFplTdrAY5DkA+CO8m/kNdcdvG3WGiUb9ShhPbGOWLngTZDsgfH4kWVWlzUVXnNgk8SHakymGSOpabIBU06STdkg0kj+zSNec/usynB9QPl5ZIgka7GB4o1+/vwXCA+tGfCas+sLVqnxAOrOrWnYpfz9EmyRFPTagH7X3KNZg1uSugobGI5J6lpt0BkCfO34a2+KI+KB5EHBQMfmcYygdoX1TN9DrvH284h1VdrMBTMSv70sGCHZa8cGDu4/AWNerTuCV6u8tJyS7IUntRB9JHWJsWgOpqbe8dISh7zdBoZXkrrEUbQUTM2M46UlvvKGbaBoI6nBQZ5gOgSaK9aG8dISH5hLGwRw7CDHDwcXhDihQXVYZ8ksyZ4YIU0u+OvGT4Dub0gK702WFZg57I/ZwlsF13i/egd2kSJFimTFJ9I1d0jFT7kgAAAAAElFTkSuQmCC>