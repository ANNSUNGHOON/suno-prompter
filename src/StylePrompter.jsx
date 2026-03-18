import { useState, useEffect, useMemo, useCallback, useRef } from "react";

const G=[{"s":"house","n":"House","k":"하우스","h":"main","cat":"Electronic","bL":115,"bH":130,"ei":["Four-on-the-floor","4/4 kick","synth pads"],"em":["Groovy","uplifting","danceable"],"pt":[{"t":"house","w":1.0,"a":"genre_label"},{"t":"four-on-the-floor","w":0.92,"a":"production"},{"t":"synth pads","w":0.84,"a":"production"},{"t":"groovy","w":0.76,"a":"production"},{"t":"sidechained bass","w":0.68,"a":"bass"},{"t":"124 BPM","w":0.6,"a":"rhythm"}],"ex":["acoustic ballad","loose live drums"],"ti":1},{"s":"deep_house","n":"Deep House","k":"딥 하우스","h":"sub","cat":"Electronic","bL":110,"bH":125,"ei":["Four-on-the-floor","Four-on-the-floor","Warm pads"],"em":["Soulful","late-night","introspective"],"pt":[{"t":"deep house","w":1.0,"a":"genre_label"},{"t":"warm bassline","w":0.92,"a":"bass"},{"t":"soulful vocal chops","w":0.84,"a":"melody"},{"t":"jazzy chords","w":0.76,"a":"harmony"},{"t":"124 BPM","w":0.68,"a":"rhythm"}],"ex":["aggressive","hard-hitting","metal"],"ti":1},{"s":"tech_house","n":"Tech House","k":"테크 하우스","h":"sub","cat":"Electronic","bL":124,"bH":130,"ei":["Percussive","Minimal synths"],"em":["Groovy","hypnotic","club-focused"],"pt":[{"t":"tech house","w":1.0,"a":"genre_label"},{"t":"groovy","w":0.92,"a":"production"},{"t":"percussive","w":0.84,"a":"production"},{"t":"minimal synths","w":0.76,"a":"production"},{"t":"rolling bass groove","w":0.68,"a":"bass"},{"t":"126 BPM","w":0.6,"a":"rhythm"}],"ex":["melodic ballad","orchestral"],"ti":2},{"s":"progressive_house","n":"Progressive House","k":"프로그레시브 하우스","h":"sub","cat":"Electronic","bL":120,"bH":130,"ei":["Four-on-the-floor with builds","Four-on-the-floor with builds","Layered synths"],"em":["Epic","uplifting","festival"],"pt":[{"t":"progressive house","w":1.0,"a":"genre_label"},{"t":"layered synths","w":0.92,"a":"production"},{"t":"epic breakdown","w":0.84,"a":"production"},{"t":"atmospheric","w":0.76,"a":"production"},{"t":"emotional crescendo","w":0.68,"a":"arrangement"},{"t":"128 BPM","w":0.6,"a":"rhythm"}],"ex":["lo-fi","raw","punk"],"ti":1},{"s":"tropical_house","n":"Tropical House","k":"트로피컬 하우스","h":"sub","cat":"Electronic","bL":100,"bH":115,"ei":["Laid-back groove","Steel drums","marimbas"],"em":["Warm","sunny","laid-back"],"pt":[{"t":"tropical house","w":1.0,"a":"genre_label"},{"t":"steel drums","w":0.92,"a":"drums"},{"t":"marimba","w":0.84,"a":"production"},{"t":"laid-back","w":0.76,"a":"production"},{"t":"warm","w":0.68,"a":"sound_design"},{"t":"108 BPM","w":0.6,"a":"rhythm"}],"ex":["dark","aggressive","industrial"],"ti":1},{"s":"acid_house","n":"Acid House","k":"애시드 하우스","h":"sub","cat":"Electronic","bL":120,"bH":150,"ei":["Driving four-on-the-floor","Driving four-on-the-floor","Roland TB-303"],"em":["Hypnotic","psychedelic","rave"],"pt":[{"t":"acid house","w":1.0,"a":"genre_label"},{"t":"TB-303","w":0.92,"a":"production"},{"t":"squelchy bass","w":0.84,"a":"bass"},{"t":"hypnotic","w":0.76,"a":"production"},{"t":"130 BPM","w":0.68,"a":"rhythm"}],"ex":["orchestral","cinematic","soft"],"ti":2},{"s":"techno","n":"Techno","k":"테크노","h":"main","cat":"Electronic","bL":120,"bH":150,"ei":["Driving","TR-909"],"em":["Dark","relentless","mechanical"],"pt":[{"t":"techno","w":1.0,"a":"genre_label"},{"t":"driving","w":0.92,"a":"production"},{"t":"mechanical","w":0.84,"a":"production"},{"t":"dark","w":0.76,"a":"mood"},{"t":"TR-909","w":0.68,"a":"production"},{"t":"135 BPM","w":0.6,"a":"rhythm"}],"ex":["pop","bright","acoustic"],"ti":2},{"s":"minimal_techno","n":"Minimal Techno","k":"미니멀 테크노","h":"sub","cat":"Electronic","bL":120,"bH":130,"ei":["Sparse","Sparse percussion","click sounds"],"em":["Hypnotic","meditative","sparse"],"pt":[{"t":"minimal techno","w":1.0,"a":"genre_label"},{"t":"sparse","w":0.92,"a":"production"},{"t":"hypnotic","w":0.84,"a":"production"},{"t":"subtle","w":0.76,"a":"bass"},{"t":"124 BPM","w":0.68,"a":"rhythm"}],"ex":["epic","loud","festival"],"ti":2},{"s":"industrial_techno","n":"Industrial Techno","k":"인더스트리얼 테크노","h":"sub","cat":"Electronic","bL":130,"bH":150,"ei":["Relentless","Distorted kicks"],"em":["Aggressive","dark","punishing"],"pt":[{"t":"industrial techno","w":1.0,"a":"genre_label"},{"t":"distorted kicks","w":0.92,"a":"drums"},{"t":"aggressive","w":0.84,"a":"mood"},{"t":"dark","w":0.76,"a":"mood"},{"t":"relentless","w":0.68,"a":"production"},{"t":"140 BPM","w":0.6,"a":"rhythm"}],"ex":["soft","mellow","acoustic"],"ti":2},{"s":"melodic_techno","n":"Melodic Techno","k":"멜로딕 테크노","h":"sub","cat":"Electronic","bL":120,"bH":135,"ei":["Pulsing","Lush pads"],"em":["Emotive","atmospheric","late-night"],"pt":[{"t":"melodic techno","w":1.0,"a":"genre_label"},{"t":"lush pads","w":0.92,"a":"production"},{"t":"arpeggios","w":0.84,"a":"production"},{"t":"emotive","w":0.76,"a":"production"},{"t":"atmospheric","w":0.68,"a":"production"},{"t":"pulsing mono bass","w":0.6,"a":"bass"},{"t":"125 BPM","w":0.52,"a":"rhythm"}],"ex":["bright pop","country","punk"],"ti":1},{"s":"trance","n":"Trance","k":"트랜스","h":"main","cat":"Electronic","bL":128,"bH":145,"ei":["Four-on-the-floor","Four-on-the-floor","Supersaws"],"em":["Euphoric","uplifting","emotional"],"pt":[{"t":"trance","w":1.0,"a":"genre_label"},{"t":"euphoric","w":0.92,"a":"mood"},{"t":"supersaw","w":0.84,"a":"production"},{"t":"arpeggiated synths","w":0.76,"a":"production"},{"t":"anthemic","w":0.68,"a":"production"},{"t":"138 BPM","w":0.6,"a":"rhythm"}],"ex":["lo-fi","acoustic","raw"],"ti":2},{"s":"psytrance","n":"Psytrance","k":"사이트랜스","h":"sub","cat":"Electronic","bL":138,"bH":155,"ei":["Rolling 16th-note bass","psychedelic FX"],"em":["Hypnotic","tribal","psychedelic"],"pt":[{"t":"psytrance","w":1.0,"a":"genre_label"},{"t":"rolling bass","w":0.92,"a":"bass"},{"t":"psychedelic","w":0.84,"a":"production"},{"t":"tribal","w":0.76,"a":"production"},{"t":"hypnotic","w":0.68,"a":"production"},{"t":"145 BPM","w":0.6,"a":"rhythm"}],"ex":["pop","country","soft"],"ti":3},{"s":"uplifting_trance","n":"Uplifting Trance","k":"업리프팅 트랜스","h":"sub","cat":"Electronic","bL":136,"bH":142,"ei":["Driving four-on-the-floor","Driving four-on-the-floor","Soaring leads"],"em":["Euphoric","dramatic","emotional"],"pt":[{"t":"uplifting trance","w":1.0,"a":"genre_label"},{"t":"soaring leads","w":0.92,"a":"production"},{"t":"euphoric","w":0.84,"a":"mood"},{"t":"dramatic build","w":0.76,"a":"arrangement"},{"t":"140 BPM","w":0.68,"a":"rhythm"}],"ex":["dark","industrial","lo-fi"],"ti":2},{"s":"dubstep","n":"Dubstep","k":"덥스텝","h":"main","cat":"Electronic","bL":140,"bH":140,"ei":["Half-time (70 BPM feel)","Wobble bass"],"em":["Aggressive","heavy","dynamic"],"pt":[{"t":"dubstep","w":1.0,"a":"genre_label"},{"t":"heavy bass drop","w":0.92,"a":"bass"},{"t":"wobble bass","w":0.84,"a":"bass"},{"t":"half-time","w":0.76,"a":"production"},{"t":"aggressive","w":0.68,"a":"mood"},{"t":"140 BPM","w":0.6,"a":"rhythm"}],"ex":["acoustic","folk","country"],"ti":2},{"s":"melodic_dubstep","n":"Melodic Dubstep","k":"멜로딕 덥스텝","h":"sub","cat":"Electronic","bL":140,"bH":150,"ei":["Half-time with builds","Emotional synths"],"em":["Emotional","cinematic","beautiful"],"pt":[{"t":"melodic dubstep","w":1.0,"a":"genre_label"},{"t":"emotional synths","w":0.92,"a":"mood"},{"t":"cinematic drops","w":0.84,"a":"arrangement"},{"t":"atmospheric","w":0.76,"a":"production"},{"t":"145 BPM","w":0.68,"a":"rhythm"}],"ex":["punk","country","lo-fi"],"ti":2},{"s":"riddim","n":"Riddim","k":"리딤","h":"sub","cat":"Electronic","bL":140,"bH":150,"ei":["Half-time","minimal percussion"],"em":["Heavy","minimal","relentless"],"pt":[{"t":"riddim","w":1.0,"a":"genre_label"},{"t":"repetitive wobble bass","w":0.92,"a":"bass"},{"t":"minimal","w":0.84,"a":"production"},{"t":"heavy","w":0.76,"a":"production"},{"t":"one-bar bass figure","w":0.68,"a":"bass"},{"t":"145 BPM","w":0.6,"a":"rhythm"}],"ex":["melodic","orchestral","pop"],"ti":3},{"s":"drum_and_bass","n":"Drum and Bass","k":"드럼 앤 베이스","h":"main","cat":"Electronic","bL":160,"bH":180,"ei":["Fast breakbeats","Breakbeats"],"em":["Energetic","forward momentum"],"pt":[{"t":"drum and bass","w":1.0,"a":"drums"},{"t":"fast breakbeats","w":0.92,"a":"drums"},{"t":"deep sub-bass","w":0.84,"a":"bass"},{"t":"energetic","w":0.76,"a":"mood"},{"t":"snare snap","w":0.68,"a":"drums"},{"t":"174 BPM","w":0.6,"a":"rhythm"}],"ex":["slow","ambient","acoustic"],"ti":2},{"s":"liquid_dnb","n":"Liquid DnB","k":"리퀴드 DnB","h":"sub","cat":"Electronic","bL":160,"bH":180,"ei":["Rolling breakbeats","Rolling breakbeats","Smooth pads"],"em":["Soulful","uplifting","smooth"],"pt":[{"t":"liquid drum and bass","w":1.0,"a":"drums"},{"t":"smooth","w":0.92,"a":"production"},{"t":"soulful","w":0.84,"a":"production"},{"t":"jazzy","w":0.76,"a":"harmony"},{"t":"rolling bassline","w":0.68,"a":"bass"},{"t":"174 BPM","w":0.6,"a":"rhythm"}],"ex":["aggressive","dark","industrial"],"ti":2},{"s":"neurofunk","n":"Neurofunk","k":"뉴로펑크","h":"sub","cat":"Electronic","bL":170,"bH":180,"ei":["Technical breakbeats","Technical breakbeats","metallic synths"],"em":["Dark","aggressive","technical"],"pt":[{"t":"neurofunk","w":1.0,"a":"genre_label"},{"t":"dark","w":0.92,"a":"mood"},{"t":"technical","w":0.84,"a":"production"},{"t":"complex bass design","w":0.76,"a":"bass"},{"t":"aggressive","w":0.68,"a":"mood"},{"t":"175 BPM","w":0.6,"a":"rhythm"}],"ex":["pop","bright","soft"],"ti":3},{"s":"ambient","n":"Ambient","k":"앰비언트","h":"main","cat":"Electronic","bL":60,"bH":120,"ei":["Minimal/no beat","Pads"],"em":["Meditative","vast","atmospheric"],"pt":[{"t":"ambient","w":1.0,"a":"genre_label"},{"t":"atmospheric","w":0.92,"a":"production"},{"t":"soundscapes","w":0.84,"a":"production"},{"t":"meditative","w":0.76,"a":"production"},{"t":"drones","w":0.68,"a":"production"},{"t":"pads","w":0.6,"a":"production"}],"ex":["aggressive","fast","loud"],"ti":1},{"s":"dark_ambient","n":"Dark Ambient","k":"다크 앰비언트","h":"sub","cat":"Electronic","bL":40,"bH":90,"ei":["No beat / very sparse","Drones"],"em":["Ominous","unsettling","dread"],"pt":[{"t":"dark ambient","w":1.0,"a":"mood"},{"t":"ominous","w":0.92,"a":"production"},{"t":"unsettling","w":0.84,"a":"production"},{"t":"drones","w":0.76,"a":"production"},{"t":"dissonant textures","w":0.68,"a":"production"}],"ex":["bright","happy","pop"],"ti":2},{"s":"synthwave","n":"Synthwave","k":"신스웨이브","h":"main","cat":"Electronic","bL":80,"bH":118,"ei":["Straight 4/4","gated reverb drums","Analog synths (Juno-106)"],"em":["Nostalgic","retro-futuristic","neon"],"pt":[{"t":"synthwave","w":1.0,"a":"genre_label"},{"t":"retro 80s","w":0.92,"a":"production"},{"t":"analog synths","w":0.84,"a":"sound_design"},{"t":"arpeggiated bass","w":0.76,"a":"bass"},{"t":"gated snare","w":0.68,"a":"drums"},{"t":"neon","w":0.6,"a":"production"},{"t":"118 BPM","w":0.52,"a":"rhythm"}],"ex":["acoustic","folk","country"],"ti":1},{"s":"future_bass","n":"Future Bass","k":"퓨처 베이스","h":"sub","cat":"Electronic","bL":130,"bH":150,"ei":["Syncopated","Detuned supersaws"],"em":["Uplifting","colorful","emotional"],"pt":[{"t":"future bass","w":1.0,"a":"bass"},{"t":"detuned supersaws","w":0.92,"a":"production"},{"t":"vocal chops","w":0.84,"a":"melody"},{"t":"colorful","w":0.76,"a":"production"},{"t":"uplifting","w":0.68,"a":"production"},{"t":"150 BPM","w":0.6,"a":"rhythm"}],"ex":["dark","industrial","metal"],"ti":1},{"s":"chillwave","n":"Chillwave","k":"칠웨이브","h":"micro","cat":"Electronic","bL":80,"bH":110,"ei":["Relaxed","vintage drums","Lo-fi synths"],"em":["Dreamy","nostalgic","summer"],"pt":[{"t":"chillwave","w":1.0,"a":"mood"},{"t":"dreamy","w":0.92,"a":"mood"},{"t":"nostalgic","w":0.84,"a":"production"},{"t":"lo-fi synths","w":0.76,"a":"sound_design"},{"t":"reverb-heavy","w":0.68,"a":"sound_design"},{"t":"hazy","w":0.6,"a":"production"},{"t":"90 BPM","w":0.52,"a":"rhythm"}],"ex":["aggressive","fast","hard-hitting"],"ti":2},{"s":"idm","n":"IDM","k":"IDM","h":"sub","cat":"Electronic","bL":60,"bH":160,"ei":["Non-standard","Complex drum programming","granular synths"],"em":["Experimental","cerebral","abstract"],"pt":[{"t":"IDM","w":1.0,"a":"genre_label"},{"t":"experimental","w":0.92,"a":"production"},{"t":"glitch","w":0.84,"a":"production"},{"t":"complex rhythms","w":0.76,"a":"production"},{"t":"abstract","w":0.68,"a":"production"},{"t":"cerebral","w":0.6,"a":"production"}],"ex":["simple","pop","mainstream"],"ti":3},{"s":"triphop","n":"Trip-Hop","k":"트립합","h":"main","cat":"Electronic","bL":60,"bH":100,"ei":["Downtempo breakbeats","Sampled breakbeats","vinyl crackle"],"em":["Dark","moody","downtempo"],"pt":[{"t":"trip-hop","w":1.0,"a":"genre_label"},{"t":"downtempo","w":0.92,"a":"rhythm"},{"t":"dark atmospheric","w":0.84,"a":"mood"},{"t":"sampled beats","w":0.76,"a":"drums"},{"t":"vinyl crackle","w":0.68,"a":"production"},{"t":"80 BPM","w":0.6,"a":"rhythm"}],"ex":["fast","bright","festival"],"ti":2},{"s":"2step_garage","n":"2-Step Garage","k":"투스텝 개러지","h":"sub","cat":"Electronic","bL":130,"bH":135,"ei":["Syncopated","Syncopated kicks"],"em":["Bouncy","nightlife","slick"],"pt":[{"t":"UK garage","w":1.0,"a":"genre_label"},{"t":"2-step","w":0.92,"a":"production"},{"t":"syncopated","w":0.84,"a":"production"},{"t":"shuffled hi-hats","w":0.76,"a":"drums"},{"t":"R&B vocals","w":0.68,"a":"melody"},{"t":"132 BPM","w":0.6,"a":"rhythm"}],"ex":["rock","metal","country"],"ti":2},{"s":"hardstyle","n":"Hardstyle","k":"하드스타일","h":"sub","cat":"Electronic","bL":140,"bH":160,"ei":["Hard-hitting kick pattern","Distorted kick","euphoric leads"],"em":["Intense","euphoric","rave"],"pt":[{"t":"hardstyle","w":1.0,"a":"genre_label"},{"t":"distorted kick","w":0.92,"a":"drums"},{"t":"euphoric leads","w":0.84,"a":"mood"},{"t":"rave energy","w":0.76,"a":"production"},{"t":"intense","w":0.68,"a":"production"},{"t":"150 BPM","w":0.6,"a":"rhythm"}],"ex":["soft","ambient","acoustic"],"ti":2},{"s":"electro","n":"Electro","k":"일렉트로","h":"sub","cat":"Electronic","bL":120,"bH":135,"ei":["Funky 808 groove","vocoder"],"em":["Funky","robotic","retro"],"pt":[{"t":"electro","w":1.0,"a":"genre_label"},{"t":"TR-808","w":0.92,"a":"bass"},{"t":"vocoder","w":0.84,"a":"production"},{"t":"robotic","w":0.76,"a":"production"},{"t":"funky-electronic","w":0.68,"a":"production"},{"t":"128 BPM","w":0.6,"a":"rhythm"}],"ex":["country","folk","acoustic"],"ti":2},{"s":"lofi_electronic","n":"Lo-Fi Electronic","k":"로파이 일렉트로닉","h":"micro","cat":"Electronic","bL":60,"bH":100,"ei":["Relaxed","lo-fi drums","Degraded synths"],"em":["Mellow","warm","bedroom"],"pt":[{"t":"lo-fi electronic","w":1.0,"a":"sound_design"},{"t":"tape hiss","w":0.92,"a":"sound_design"},{"t":"warm","w":0.84,"a":"sound_design"},{"t":"mellow","w":0.76,"a":"production"},{"t":"degraded synths","w":0.68,"a":"production"},{"t":"80 BPM","w":0.6,"a":"rhythm"}],"ex":["aggressive","fast","hard"],"ti":1},{"s":"trap","n":"Trap","k":"트랩","h":"main","cat":"Hip-Hop","bL":130,"bH":160,"ei":["Half-time","rapid hi-hats","synth pads"],"em":["Aggressive","dark","hard-hitting"],"pt":[{"t":"trap","w":1.0,"a":"melody"},{"t":"808 bass","w":0.92,"a":"bass"},{"t":"hi-hat rolls","w":0.84,"a":"drums"},{"t":"dark synths","w":0.76,"a":"mood"},{"t":"aggressive","w":0.68,"a":"mood"},{"t":"triplet hi-hats","w":0.6,"a":"drums"},{"t":"808 glide","w":0.52,"a":"bass"}],"ex":["boom bap","live funk drums","jazz"],"ti":1},{"s":"boom_bap","n":"Boom Bap","k":"붐뱁","h":"sub","cat":"Hip-Hop","bL":80,"bH":95,"ei":["Head-nod swing","front-heavy snare","MPC"],"em":["Lyrical","golden-era","raw"],"pt":[{"t":"boom bap","w":1.0,"a":"genre_label"},{"t":"old school hip-hop","w":0.92,"a":"production"},{"t":"vinyl crackle","w":0.84,"a":"production"},{"t":"jazzy samples","w":0.76,"a":"harmony"},{"t":"punchy drums","w":0.68,"a":"drums"},{"t":"MPC feel","w":0.6,"a":"production"},{"t":"88 BPM","w":0.52,"a":"rhythm"}],"ex":["trap","modern","EDM","auto-tune"],"ti":2},{"s":"lofi_hip_hop","n":"Lo-Fi Hip Hop","k":"로파이 힙합","h":"sub","cat":"Hip-Hop","bL":60,"bH":90,"ei":["Relaxed","muted drums","Dusty vinyl samples"],"em":["Chill","study","late-night"],"pt":[{"t":"lo-fi hip hop","w":1.0,"a":"sound_design"},{"t":"dusty vinyl","w":0.92,"a":"production"},{"t":"jazzy chords","w":0.84,"a":"harmony"},{"t":"tape hiss","w":0.76,"a":"sound_design"},{"t":"chill","w":0.68,"a":"mood"},{"t":"relaxed","w":0.6,"a":"production"},{"t":"warm Rhodes","w":0.52,"a":"sound_design"}],"ex":["aggressive","fast","hard-hitting"],"ti":1},{"s":"melodic_rap","n":"Melodic Rap","k":"멜로딕 랩","h":"sub","cat":"Hip-Hop","bL":130,"bH":145,"ei":["Half-time with melodic hooks","Lush pads"],"em":["Emotional","atmospheric","vulnerable"],"pt":[{"t":"melodic rap","w":1.0,"a":"melody"},{"t":"atmospheric pads","w":0.92,"a":"production"},{"t":"808s","w":0.84,"a":"bass"},{"t":"AutoTune vocals","w":0.76,"a":"melody"},{"t":"emotional","w":0.68,"a":"mood"},{"t":"140 BPM","w":0.6,"a":"rhythm"}],"ex":["boom bap","acoustic","folk"],"ti":1},{"s":"uk_drill","n":"UK Drill","k":"UK 드릴","h":"sub","cat":"Hip-Hop","bL":140,"bH":144,"ei":["Syncopated hi-hats","Syncopated hi-hats","eerie strings/piano"],"em":["Dark","menacing","street"],"pt":[{"t":"UK drill","w":1.0,"a":"genre_label"},{"t":"sliding 808s","w":0.92,"a":"bass"},{"t":"eerie piano","w":0.84,"a":"production"},{"t":"dark","w":0.76,"a":"mood"},{"t":"syncopated hi-hats","w":0.68,"a":"drums"},{"t":"cold ambience","w":0.6,"a":"production"},{"t":"142 BPM","w":0.52,"a":"rhythm"}],"ex":["country","folk","bright pop"],"ti":2},{"s":"chicago_drill","n":"Chicago Drill","k":"시카고 드릴","h":"sub","cat":"Hip-Hop","bL":140,"bH":150,"ei":["Heavy 808 pattern","dark piano"],"em":["Aggressive","menacing","raw"],"pt":[{"t":"Chicago drill","w":1.0,"a":"genre_label"},{"t":"dark piano","w":0.92,"a":"mood"},{"t":"heavy 808 bass","w":0.84,"a":"bass"},{"t":"aggressive","w":0.76,"a":"mood"},{"t":"menacing","w":0.68,"a":"production"},{"t":"145 BPM","w":0.6,"a":"rhythm"}],"ex":["country","folk","soft"],"ti":2},{"s":"phonk","n":"Phonk","k":"퐁크","h":"sub","cat":"Hip-Hop","bL":60,"bH":80,"ei":["Chopped-and-screwed","Memphis vocal samples"],"em":["Dark","lo-fi","Memphis"],"pt":[{"t":"phonk","w":1.0,"a":"genre_label"},{"t":"Memphis samples","w":0.92,"a":"production"},{"t":"808 bass","w":0.84,"a":"bass"},{"t":"lo-fi","w":0.76,"a":"sound_design"},{"t":"dark","w":0.68,"a":"mood"},{"t":"chopped-and-screwed","w":0.6,"a":"production"},{"t":"cowbell","w":0.52,"a":"production"}],"ex":["bright pop","EDM","orchestral"],"ti":2},{"s":"cloud_rap","n":"Cloud Rap","k":"클라우드 랩","h":"sub","cat":"Hip-Hop","bL":60,"bH":80,"ei":["Soft attack drums","Soft attack drums","Ethereal reverbed synths"],"em":["Hazy","spacey","introspective"],"pt":[{"t":"cloud rap","w":1.0,"a":"melody"},{"t":"ethereal synths","w":0.92,"a":"production"},{"t":"dreamy","w":0.84,"a":"mood"},{"t":"hazy","w":0.76,"a":"production"},{"t":"spacey","w":0.68,"a":"production"},{"t":"soft 808s","w":0.6,"a":"bass"},{"t":"washed-out pads","w":0.52,"a":"production"}],"ex":["aggressive","punk","metal"],"ti":2},{"s":"gfunk","n":"G-Funk","k":"지펑크","h":"sub","cat":"Hip-Hop","bL":90,"bH":100,"ei":["Laid-back groove","Moog synth leads"],"em":["Smooth","funky","laid-back"],"pt":[{"t":"G-funk","w":1.0,"a":"genre_label"},{"t":"Moog synth","w":0.92,"a":"production"},{"t":"funky","w":0.84,"a":"production"},{"t":"smooth","w":0.76,"a":"production"},{"t":"West Coast","w":0.68,"a":"production"},{"t":"laid-back","w":0.6,"a":"production"},{"t":"talk box","w":0.52,"a":"production"}],"ex":["trap","EDM","metal"],"ti":2},{"s":"crunk","n":"Crunk","k":"크렁크","h":"sub","cat":"Hip-Hop","bL":75,"bH":105,"ei":["Heavy 808 pattern","chanted vocals"],"em":["High-energy","party","aggressive"],"pt":[{"t":"crunk","w":1.0,"a":"genre_label"},{"t":"heavy 808","w":0.92,"a":"bass"},{"t":"chanted vocals","w":0.84,"a":"melody"},{"t":"brass stabs","w":0.76,"a":"production"},{"t":"high-energy","w":0.68,"a":"production"},{"t":"Southern","w":0.6,"a":"production"},{"t":"85 BPM","w":0.52,"a":"rhythm"}],"ex":["ambient","folk","acoustic"],"ti":2},{"s":"hyperpop","n":"Hyperpop","k":"하이퍼팝","h":"micro","cat":"Hip-Hop","bL":140,"bH":200,"ei":["Glitchy","glitchy drums","Distorted synths"],"em":["Chaotic","maximalist","sugar-rush"],"pt":[{"t":"hyperpop","w":1.0,"a":"genre_label"},{"t":"distorted synths","w":0.92,"a":"sound_design"},{"t":"pitch-shifted vocals","w":0.84,"a":"melody"},{"t":"chaotic","w":0.76,"a":"production"},{"t":"maximalist","w":0.68,"a":"production"},{"t":"glitchy","w":0.6,"a":"production"},{"t":"clipped master","w":0.52,"a":"production"}],"ex":["acoustic","folk","ambient"],"ti":2},{"s":"memphis_rap","n":"Memphis Rap","k":"멤피스 랩","h":"sub","cat":"Hip-Hop","bL":130,"bH":160,"ei":["Triplet flow","dark horror synths"],"em":["Dark","horrorcore","underground"],"pt":[{"t":"Memphis rap","w":1.0,"a":"melody"},{"t":"dark 808","w":0.92,"a":"bass"},{"t":"horror synths","w":0.84,"a":"production"},{"t":"lo-fi","w":0.76,"a":"sound_design"},{"t":"triplet flow","w":0.68,"a":"production"},{"t":"underground","w":0.6,"a":"production"},{"t":"140 BPM","w":0.52,"a":"rhythm"}],"ex":["bright","pop","country"],"ti":3},{"s":"classic_rock","n":"Classic Rock","k":"클래식 록","h":"main","cat":"Rock","bL":110,"bH":140,"ei":["Straight rock beat","drums","Electric/acoustic guitar"],"em":["Powerful","anthemic","bluesy"],"pt":[{"t":"classic rock","w":1.0,"a":"genre_label"},{"t":"electric guitar riffs","w":0.92,"a":"production"},{"t":"powerful vocals","w":0.84,"a":"melody"},{"t":"bluesy","w":0.76,"a":"production"},{"t":"live room drums","w":0.68,"a":"drums"},{"t":"tube amp crunch","w":0.6,"a":"production"},{"t":"125 BPM","w":0.52,"a":"rhythm"}],"ex":["EDM","trap","electronic"],"ti":1},{"s":"hard_rock","n":"Hard Rock","k":"하드 록","h":"sub","cat":"Rock","bL":100,"bH":140,"ei":["Driving rhythm","drums","Distorted guitar"],"em":["Aggressive","powerful","driving"],"pt":[{"t":"hard rock","w":1.0,"a":"genre_label"},{"t":"heavy power chords","w":0.92,"a":"harmony"},{"t":"distorted guitar","w":0.84,"a":"sound_design"},{"t":"driving rhythm","w":0.76,"a":"production"},{"t":"130 BPM","w":0.68,"a":"rhythm"}],"ex":["ambient","lo-fi","acoustic folk"],"ti":2},{"s":"punk_rock","n":"Punk Rock","k":"펑크 록","h":"sub","cat":"Rock","bL":160,"bH":200,"ei":["Fast","drums","Electric guitar"],"em":["Fast","raw","rebellious"],"pt":[{"t":"punk rock","w":1.0,"a":"genre_label"},{"t":"fast","w":0.92,"a":"production"},{"t":"raw energy","w":0.84,"a":"sound_design"},{"t":"power chords","w":0.76,"a":"harmony"},{"t":"short aggressive","w":0.68,"a":"mood"},{"t":"minimal production","w":0.6,"a":"production"},{"t":"180 BPM","w":0.52,"a":"rhythm"}],"ex":["polished pop","EDM","ambient"],"ti":2},{"s":"pop_punk","n":"Pop Punk","k":"팝 펑크","h":"sub","cat":"Rock","bL":150,"bH":180,"ei":["Fast","drums","Electric guitar"],"em":["Catchy","energetic","youthful"],"pt":[{"t":"pop punk","w":1.0,"a":"genre_label"},{"t":"catchy hooks","w":0.92,"a":"melody"},{"t":"anthemic chorus","w":0.84,"a":"production"},{"t":"fast","w":0.76,"a":"production"},{"t":"energetic","w":0.68,"a":"mood"},{"t":"165 BPM","w":0.6,"a":"rhythm"}],"ex":["dark ambient","industrial","hip-hop"],"ti":1},{"s":"postpunk","n":"Post-Punk","k":"포스트 펑크","h":"sub","cat":"Rock","bL":120,"bH":160,"ei":["Angular","Guitar (chorus/delay)"],"em":["Dark","angular","atmospheric"],"pt":[{"t":"post-punk","w":1.0,"a":"genre_label"},{"t":"angular guitars","w":0.92,"a":"production"},{"t":"prominent bass","w":0.84,"a":"bass"},{"t":"dark","w":0.76,"a":"mood"},{"t":"atmospheric","w":0.68,"a":"production"},{"t":"chorus/delay","w":0.6,"a":"sound_design"},{"t":"135 BPM","w":0.52,"a":"rhythm"}],"ex":["bright pop","country","EDM"],"ti":2},{"s":"heavy_metal","n":"Heavy Metal","k":"헤비메탈","h":"main","cat":"Rock","bL":100,"bH":160,"ei":["Double-kick","double-kick drums","Distorted guitar"],"em":["Aggressive","powerful","intense"],"pt":[{"t":"heavy metal","w":1.0,"a":"genre_label"},{"t":"distorted guitar riffs","w":0.92,"a":"sound_design"},{"t":"double-kick drums","w":0.84,"a":"drums"},{"t":"powerful vocals","w":0.76,"a":"melody"},{"t":"tight palm-mute","w":0.68,"a":"production"},{"t":"140 BPM","w":0.6,"a":"rhythm"}],"ex":["pop","acoustic","ambient"],"ti":3},{"s":"thrash_metal","n":"Thrash Metal","k":"스래시 메탈","h":"sub","cat":"Rock","bL":180,"bH":220,"ei":["Extremely fast","double-bass drums","Distorted guitar"],"em":["Extremely fast","aggressive"],"pt":[{"t":"thrash metal","w":1.0,"a":"genre_label"},{"t":"extremely fast riffs","w":0.92,"a":"production"},{"t":"aggressive","w":0.84,"a":"mood"},{"t":"double-bass drums","w":0.76,"a":"drums"},{"t":"raw amp tone","w":0.68,"a":"sound_design"},{"t":"200 BPM","w":0.6,"a":"rhythm"}],"ex":["pop","ambient","lo-fi"],"ti":3},{"s":"death_metal","n":"Death Metal","k":"데스메탈","h":"sub","cat":"Rock","bL":100,"bH":200,"ei":["Blast beats","blast-beat drums","Down-tuned guitar"],"em":["Brutal","relentless","extreme"],"pt":[{"t":"death metal","w":1.0,"a":"genre_label"},{"t":"growled vocals","w":0.92,"a":"melody"},{"t":"blast beats","w":0.84,"a":"drums"},{"t":"down-tuned guitar","w":0.76,"a":"production"},{"t":"brutal","w":0.68,"a":"production"},{"t":"180 BPM","w":0.6,"a":"rhythm"}],"ex":["pop","country","soft"],"ti":3},{"s":"black_metal","n":"Black Metal","k":"블랙메탈","h":"sub","cat":"Rock","bL":120,"bH":200,"ei":["Blast beats","blast-beat drums","Tremolo-picked guitar"],"em":["Atmospheric","harsh","extreme"],"pt":[{"t":"black metal","w":1.0,"a":"genre_label"},{"t":"shrieked vocals","w":0.92,"a":"melody"},{"t":"tremolo picking","w":0.84,"a":"production"},{"t":"lo-fi","w":0.76,"a":"sound_design"},{"t":"atmospheric","w":0.68,"a":"production"},{"t":"170 BPM","w":0.6,"a":"rhythm"}],"ex":["pop","bright","dance"],"ti":3},{"s":"doom_metal","n":"Doom Metal","k":"둠 메탈","h":"sub","cat":"Rock","bL":40,"bH":80,"ei":["Very slow","slow drums","Down-tuned guitar"],"em":["Slow","heavy","crushing"],"pt":[{"t":"doom metal","w":1.0,"a":"genre_label"},{"t":"very slow","w":0.92,"a":"production"},{"t":"crushing riffs","w":0.84,"a":"production"},{"t":"down-tuned guitar","w":0.76,"a":"production"},{"t":"dark","w":0.68,"a":"mood"},{"t":"heavy","w":0.6,"a":"production"},{"t":"55 BPM","w":0.52,"a":"rhythm"}],"ex":["fast","bright","pop","dance"],"ti":3},{"s":"progressive_metal","n":"Progressive Metal","k":"프로그레시브 메탈","h":"sub","cat":"Rock","bL":80,"bH":180,"ei":["Odd-time","drums","Guitar"],"em":["Technical","dynamic","epic"],"pt":[{"t":"progressive metal","w":1.0,"a":"genre_label"},{"t":"complex time signatures","w":0.92,"a":"production"},{"t":"technical","w":0.84,"a":"production"},{"t":"dynamic shifts","w":0.76,"a":"production"},{"t":"130 BPM","w":0.68,"a":"rhythm"}],"ex":["simple pop","country","lo-fi"],"ti":3},{"s":"nu_metal","n":"Nu Metal","k":"누메탈","h":"sub","cat":"Rock","bL":90,"bH":130,"ei":["Groove-oriented","Down-tuned guitar"],"em":["Aggressive","groove","angsty"],"pt":[{"t":"nu metal","w":1.0,"a":"genre_label"},{"t":"down-tuned guitar","w":0.92,"a":"production"},{"t":"rap vocals","w":0.84,"a":"melody"},{"t":"groove-oriented","w":0.76,"a":"production"},{"t":"aggressive","w":0.68,"a":"mood"},{"t":"110 BPM","w":0.6,"a":"rhythm"}],"ex":["country","folk","ambient"],"ti":2},{"s":"alternative_rock","n":"Alternative Rock","k":"얼터너티브 록","h":"main","cat":"Rock","bL":100,"bH":140,"ei":["Varied dynamics","drums","Guitar"],"em":["Dynamic","varied","non-mainstream"],"pt":[{"t":"alternative rock","w":1.0,"a":"genre_label"},{"t":"dynamic","w":0.92,"a":"production"},{"t":"varied","w":0.84,"a":"production"},{"t":"non-mainstream","w":0.76,"a":"production"},{"t":"120 BPM","w":0.68,"a":"rhythm"}],"ex":["EDM","trap","country"],"ti":1},{"s":"indie_rock","n":"Indie Rock","k":"인디 록","h":"sub","cat":"Rock","bL":100,"bH":140,"ei":["Human tempo","drums","Guitar"],"em":["Nostalgic","warm","introspective"],"pt":[{"t":"indie rock","w":1.0,"a":"genre_label"},{"t":"jangly guitars","w":0.92,"a":"production"},{"t":"warm vocals","w":0.84,"a":"melody"},{"t":"nostalgic","w":0.76,"a":"production"},{"t":"lo-fi","w":0.68,"a":"sound_design"},{"t":"human tempo feel","w":0.6,"a":"rhythm"},{"t":"118 BPM","w":0.52,"a":"rhythm"}],"ex":["EDM","trap","metal"],"ti":1},{"s":"grunge","n":"Grunge","k":"그런지","h":"sub","cat":"Rock","bL":80,"bH":120,"ei":["Quiet-loud dynamic shift","drums","Distorted guitar"],"em":["Raw","gritty","angsty"],"pt":[{"t":"90s grunge","w":1.0,"a":"genre_label"},{"t":"distorted guitar","w":0.92,"a":"sound_design"},{"t":"raw raspy vocals","w":0.84,"a":"melody"},{"t":"tape-saturated","w":0.76,"a":"sound_design"},{"t":"gritty","w":0.68,"a":"production"},{"t":"sludgy riff","w":0.6,"a":"production"},{"t":"quiet-loud","w":0.52,"a":"production"}],"ex":["polished pop sheen","EDM pumping","bright"],"ti":2},{"s":"postrock","n":"Post-Rock","k":"포스트 록","h":"sub","cat":"Rock","bL":80,"bH":140,"ei":["Crescendo builds","drums","Guitar (effects-heavy)"],"em":["Atmospheric","cinematic","epic"],"pt":[{"t":"post-rock","w":1.0,"a":"genre_label"},{"t":"atmospheric","w":0.92,"a":"production"},{"t":"crescendo builds","w":0.84,"a":"arrangement"},{"t":"effects-heavy guitar","w":0.76,"a":"production"},{"t":"cinematic","w":0.68,"a":"production"},{"t":"100 BPM","w":0.6,"a":"rhythm"}],"ex":["pop","dance","hip-hop"],"ti":2},{"s":"shoegaze","n":"Shoegaze","k":"슈게이즈","h":"sub","cat":"Rock","bL":90,"bH":135,"ei":["Wall of sound","drums","Guitar (reverb/delay/fuzz)"],"em":["Dreamy","ethereal","hazy"],"pt":[{"t":"shoegaze","w":1.0,"a":"genre_label"},{"t":"wall of sound","w":0.92,"a":"production"},{"t":"heavy reverb","w":0.84,"a":"sound_design"},{"t":"ethereal","w":0.76,"a":"production"},{"t":"buried vocals","w":0.68,"a":"melody"},{"t":"dreamy","w":0.6,"a":"mood"},{"t":"fuzz wash","w":0.52,"a":"sound_design"}],"ex":["clean","bright","tight production"],"ti":2},{"s":"garage_rock","n":"Garage Rock","k":"개러지 록","h":"sub","cat":"Rock","bL":120,"bH":160,"ei":["Energetic","drums","Electric guitar"],"em":["Energetic","raw","lo-fi"],"pt":[{"t":"garage rock","w":1.0,"a":"genre_label"},{"t":"raw","w":0.92,"a":"sound_design"},{"t":"lo-fi","w":0.84,"a":"sound_design"},{"t":"simple riffs","w":0.76,"a":"production"},{"t":"energetic","w":0.68,"a":"mood"},{"t":"stripped-down","w":0.6,"a":"production"},{"t":"140 BPM","w":0.52,"a":"rhythm"}],"ex":["polished","orchestral","ambient"],"ti":2},{"s":"psychedelic_rock","n":"Psychedelic Rock","k":"사이키델릭 록","h":"sub","cat":"Rock","bL":90,"bH":140,"ei":["Loose","Guitar (effects)"],"em":["Trippy","expansive","mind-bending"],"pt":[{"t":"psychedelic rock","w":1.0,"a":"genre_label"},{"t":"trippy effects","w":0.92,"a":"production"},{"t":"swirling guitars","w":0.84,"a":"production"},{"t":"organ","w":0.76,"a":"production"},{"t":"reverb","w":0.68,"a":"sound_design"},{"t":"110 BPM","w":0.6,"a":"rhythm"}],"ex":["clean pop","minimal","tight"],"ti":2},{"s":"stoner_rock","n":"Stoner Rock","k":"스토너 록","h":"sub","cat":"Rock","bL":70,"bH":110,"ei":["Slow","drums","Down-tuned/fuzz guitar"],"em":["Hypnotic","heavy","fuzz-drenched"],"pt":[{"t":"stoner rock","w":1.0,"a":"genre_label"},{"t":"fuzz guitar","w":0.92,"a":"sound_design"},{"t":"slow heavy grooves","w":0.84,"a":"production"},{"t":"hypnotic riffs","w":0.76,"a":"production"},{"t":"85 BPM","w":0.68,"a":"rhythm"}],"ex":["bright","fast","clean pop"],"ti":2},{"s":"math_rock","n":"Math Rock","k":"매스 록","h":"sub","cat":"Rock","bL":100,"bH":160,"ei":["Complex","drums","Clean guitar (tapping)"],"em":["Technical","complex","angular"],"pt":[{"t":"math rock","w":1.0,"a":"genre_label"},{"t":"complex rhythms","w":0.92,"a":"production"},{"t":"irregular time signatures","w":0.84,"a":"production"},{"t":"technical","w":0.76,"a":"production"},{"t":"clean guitar","w":0.68,"a":"production"},{"t":"5/4 7/8 odd-time","w":0.6,"a":"production"},{"t":"stop-start","w":0.52,"a":"production"}],"ex":["simple pop","four-on-the-floor","mainstream"],"ti":4},{"s":"emo","n":"Emo","k":"이모","h":"sub","cat":"Rock","bL":100,"bH":170,"ei":["Dynamic shifts","drums","Guitar"],"em":["Emotional","confessional","intense"],"pt":[{"t":"emo","w":1.0,"a":"genre_label"},{"t":"confessional lyrics","w":0.92,"a":"production"},{"t":"emotional vocals","w":0.84,"a":"melody"},{"t":"dynamic shifts","w":0.76,"a":"production"},{"t":"melodic","w":0.68,"a":"production"},{"t":"130 BPM","w":0.6,"a":"rhythm"}],"ex":["dance","EDM","hip-hop"],"ti":2},{"s":"synth_pop","n":"Synth Pop","k":"신스팝","h":"main","cat":"Pop","bL":110,"bH":140,"ei":["Drum machine","drum machines","Analog synths"],"em":["Catchy","bright","electronic"],"pt":[{"t":"synth pop","w":1.0,"a":"genre_label"},{"t":"analog synths","w":0.92,"a":"sound_design"},{"t":"catchy melodies","w":0.84,"a":"production"},{"t":"drum machine","w":0.76,"a":"drums"},{"t":"glossy topline","w":0.68,"a":"production"},{"t":"tight kick-clap","w":0.6,"a":"drums"},{"t":"120 BPM","w":0.52,"a":"rhythm"}],"ex":["metal","punk","raw rock"],"ti":1},{"s":"electropop","n":"Electropop","k":"일렉트로팝","h":"sub","cat":"Pop","bL":115,"bH":135,"ei":["Dance-friendly","Software synths"],"em":["Polished","dance-friendly","bright"],"pt":[{"t":"electropop","w":1.0,"a":"genre_label"},{"t":"polished digital","w":0.92,"a":"sound_design"},{"t":"auto-tuned vocals","w":0.84,"a":"melody"},{"t":"dance-friendly","w":0.76,"a":"production"},{"t":"radio-ready","w":0.68,"a":"production"},{"t":"125 BPM","w":0.6,"a":"rhythm"}],"ex":["raw","lo-fi","metal","punk"],"ti":1},{"s":"indie_pop","n":"Indie Pop","k":"인디 팝","h":"sub","cat":"Pop","bL":90,"bH":130,"ei":["Relaxed","Jangly guitar"],"em":["Charming","understated","melodic"],"pt":[{"t":"indie pop","w":1.0,"a":"genre_label"},{"t":"lo-fi charm","w":0.92,"a":"sound_design"},{"t":"melodic hooks","w":0.84,"a":"melody"},{"t":"understated","w":0.76,"a":"production"},{"t":"jangly guitar","w":0.68,"a":"production"},{"t":"110 BPM","w":0.6,"a":"rhythm"}],"ex":["metal","EDM","aggressive"],"ti":1},{"s":"dream_pop","n":"Dream Pop","k":"드림 팝","h":"sub","cat":"Pop","bL":80,"bH":120,"ei":["Soft-focus","soft drums","Reverb guitar"],"em":["Ethereal","hazy","dreamy"],"pt":[{"t":"dream pop","w":1.0,"a":"genre_label"},{"t":"ethereal","w":0.92,"a":"production"},{"t":"hazy","w":0.84,"a":"production"},{"t":"breathy vocals","w":0.76,"a":"melody"},{"t":"lush textures","w":0.68,"a":"production"},{"t":"reverb","w":0.6,"a":"sound_design"},{"t":"soft-focus mix","w":0.52,"a":"production"}],"ex":["aggressive","fast","hard-hitting"],"ti":1},{"s":"kpop","n":"K-Pop","k":"케이팝","h":"sub","cat":"Pop","bL":90,"bH":140,"ei":["Section contrast","drum machines","Synths"],"em":["Dynamic","catchy","polished"],"pt":[{"t":"K-pop","w":1.0,"a":"genre_label"},{"t":"high production","w":0.92,"a":"production"},{"t":"genre-blending","w":0.84,"a":"production"},{"t":"dynamic","w":0.76,"a":"production"},{"t":"catchy","w":0.68,"a":"production"},{"t":"polished","w":0.6,"a":"sound_design"},{"t":"section contrast","w":0.52,"a":"arrangement"}],"ex":["raw","lo-fi","metal","punk"],"ti":1},{"s":"city_pop","n":"City Pop","k":"시티팝","h":"micro","cat":"Pop","bL":80,"bH":120,"ei":["Funk bass groove","Rhodes piano"],"em":["Nostalgic","glossy","urban"],"pt":[{"t":"city pop","w":1.0,"a":"genre_label"},{"t":"80s Japanese","w":0.92,"a":"production"},{"t":"Rhodes piano","w":0.84,"a":"production"},{"t":"funk bass","w":0.76,"a":"bass"},{"t":"glossy production","w":0.68,"a":"production"},{"t":"100 BPM","w":0.6,"a":"rhythm"}],"ex":["metal","punk","aggressive"],"ti":2},{"s":"bedroom_pop","n":"Bedroom Pop","k":"베드룸 팝","h":"micro","cat":"Pop","bL":80,"bH":120,"ei":["Relaxed","DIY drums","Acoustic/electric guitar"],"em":["Intimate","warm","homemade"],"pt":[{"t":"bedroom pop","w":1.0,"a":"genre_label"},{"t":"intimate","w":0.92,"a":"production"},{"t":"lo-fi","w":0.84,"a":"sound_design"},{"t":"warm","w":0.76,"a":"sound_design"},{"t":"imperfect vocals","w":0.68,"a":"melody"},{"t":"DIY","w":0.6,"a":"production"},{"t":"95 BPM","w":0.52,"a":"rhythm"}],"ex":["metal","EDM","aggressive"],"ti":1},{"s":"baroque_pop","n":"Baroque Pop","k":"바로크 팝","h":"sub","cat":"Pop","bL":90,"bH":130,"ei":["Orchestral","Strings"],"em":["Lush","theatrical","ornate"],"pt":[{"t":"baroque pop","w":1.0,"a":"genre_label"},{"t":"orchestral arrangements","w":0.92,"a":"production"},{"t":"harpsichord","w":0.84,"a":"harmony"},{"t":"lush harmonies","w":0.76,"a":"production"},{"t":"110 BPM","w":0.68,"a":"rhythm"}],"ex":["EDM","hip-hop","metal"],"ti":2},{"s":"art_pop","n":"Art Pop","k":"아트 팝","h":"sub","cat":"Pop","bL":80,"bH":140,"ei":["Non-standard","Varied/experimental"],"em":["Avant-garde","conceptual","artistic"],"pt":[{"t":"art pop","w":1.0,"a":"genre_label"},{"t":"avant-garde","w":0.92,"a":"production"},{"t":"unconventional","w":0.84,"a":"production"},{"t":"experimental production","w":0.76,"a":"production"},{"t":"conceptual","w":0.68,"a":"production"}],"ex":["mainstream","formulaic","simple"],"ti":3},{"s":"dance_pop","n":"Dance Pop","k":"댄스 팝","h":"sub","cat":"Pop","bL":110,"bH":130,"ei":["Four-on-the-floor","drum machines","Synths"],"em":["Euphoric","danceable","radio-ready"],"pt":[{"t":"dance pop","w":1.0,"a":"genre_label"},{"t":"four-on-the-floor","w":0.92,"a":"production"},{"t":"euphoric hooks","w":0.84,"a":"melody"},{"t":"radio-ready","w":0.76,"a":"production"},{"t":"energetic","w":0.68,"a":"mood"},{"t":"120 BPM","w":0.6,"a":"rhythm"}],"ex":["metal","punk","dark ambient"],"ti":1},{"s":"power_pop","n":"Power Pop","k":"파워 팝","h":"sub","cat":"Pop","bL":120,"bH":160,"ei":["Energetic","drums","Electric guitar"],"em":["Energetic","melodic","tight"],"pt":[{"t":"power pop","w":1.0,"a":"genre_label"},{"t":"crunchy guitars","w":0.92,"a":"production"},{"t":"strong melodies","w":0.84,"a":"production"},{"t":"tight harmonies","w":0.76,"a":"production"},{"t":"energetic","w":0.68,"a":"mood"},{"t":"140 BPM","w":0.6,"a":"rhythm"}],"ex":["ambient","lo-fi","metal"],"ti":2},{"s":"bebop","n":"Bebop","k":"비밥","h":"sub","cat":"Jazz","bL":180,"bH":300,"ei":["Fast swing","drums","Saxophone"],"em":["Virtuosic","fast","complex"],"pt":[{"t":"bebop jazz","w":1.0,"a":"harmony"},{"t":"fast tempo","w":0.92,"a":"rhythm"},{"t":"complex chord changes","w":0.84,"a":"harmony"},{"t":"saxophone","w":0.76,"a":"production"},{"t":"walking bass","w":0.68,"a":"bass"},{"t":"220 BPM","w":0.6,"a":"rhythm"}],"ex":["EDM","trap","metal","pop"],"ti":3},{"s":"cool_jazz","n":"Cool Jazz","k":"쿨 재즈","h":"sub","cat":"Jazz","bL":80,"bH":120,"ei":["Relaxed swing","brushed drums","Piano"],"em":["Relaxed","subdued","spacious"],"pt":[{"t":"cool jazz","w":1.0,"a":"harmony"},{"t":"relaxed","w":0.92,"a":"production"},{"t":"subdued","w":0.84,"a":"bass"},{"t":"spacious","w":0.76,"a":"production"},{"t":"brushed drums","w":0.68,"a":"drums"},{"t":"100 BPM","w":0.6,"a":"rhythm"}],"ex":["aggressive","fast","EDM"],"ti":2},{"s":"smooth_jazz","n":"Smooth Jazz","k":"스무스 재즈","h":"sub","cat":"Jazz","bL":80,"bH":110,"ei":["Soft groove","soft drums","Soprano sax"],"em":["Smooth","polished","accessible"],"pt":[{"t":"smooth jazz","w":1.0,"a":"harmony"},{"t":"polished","w":0.92,"a":"sound_design"},{"t":"melodic saxophone","w":0.84,"a":"production"},{"t":"soft","w":0.76,"a":"production"},{"t":"accessible","w":0.68,"a":"production"},{"t":"95 BPM","w":0.6,"a":"rhythm"}],"ex":["metal","punk","EDM"],"ti":1},{"s":"acid_jazz","n":"Acid Jazz","k":"애시드 재즈","h":"sub","cat":"Jazz","bL":90,"bH":120,"ei":["Funky groove","Rhodes keys"],"em":["Funky","dance-oriented","groove"],"pt":[{"t":"acid jazz","w":1.0,"a":"harmony"},{"t":"funky groove","w":0.92,"a":"production"},{"t":"Rhodes keys","w":0.84,"a":"harmony"},{"t":"slap bass","w":0.76,"a":"bass"},{"t":"dance-oriented","w":0.68,"a":"production"},{"t":"110 BPM","w":0.6,"a":"rhythm"}],"ex":["metal","punk","aggressive"],"ti":2},{"s":"jazz_fusion","n":"Jazz Fusion","k":"재즈 퓨전","h":"sub","cat":"Jazz","bL":90,"bH":160,"ei":["Energetic","drums","Electric guitar"],"em":["Energetic","complex","electric"],"pt":[{"t":"jazz fusion","w":1.0,"a":"harmony"},{"t":"electric guitar","w":0.92,"a":"production"},{"t":"complex harmonies","w":0.84,"a":"production"},{"t":"energetic","w":0.76,"a":"mood"},{"t":"130 BPM","w":0.68,"a":"rhythm"}],"ex":["simple pop","country","lo-fi"],"ti":3},{"s":"bossa_nova","n":"Bossa Nova","k":"보사노바","h":"sub","cat":"Jazz","bL":90,"bH":120,"ei":["Brazilian syncopation","light percussion","Nylon guitar"],"em":["Romantic","intimate","warm"],"pt":[{"t":"bossa nova","w":1.0,"a":"genre_label"},{"t":"nylon guitar","w":0.92,"a":"production"},{"t":"gentle swing","w":0.84,"a":"production"},{"t":"intimate vocals","w":0.76,"a":"melody"},{"t":"Brazilian","w":0.68,"a":"production"},{"t":"105 BPM","w":0.6,"a":"rhythm"}],"ex":["metal","EDM","aggressive"],"ti":2},{"s":"swing","n":"Swing","k":"스윙","h":"sub","cat":"Jazz","bL":90,"bH":180,"ei":["Swing eighths","Big band: brass"],"em":["Lively","danceable","celebratory"],"pt":[{"t":"swing","w":1.0,"a":"genre_label"},{"t":"big band","w":0.92,"a":"production"},{"t":"brass","w":0.84,"a":"production"},{"t":"swinging rhythm","w":0.76,"a":"production"},{"t":"danceable","w":0.68,"a":"production"},{"t":"150 BPM","w":0.6,"a":"rhythm"}],"ex":["EDM","trap","metal"],"ti":2},{"s":"neosoul","n":"Neo-Soul","k":"네오 소울","h":"sub","cat":"R&B / Soul","bL":70,"bH":100,"ei":["Pocket groove","Rhodes"],"em":["Soulful","intimate","late-night"],"pt":[{"t":"neo-soul","w":1.0,"a":"genre_label"},{"t":"warm keys","w":0.92,"a":"harmony"},{"t":"Rhodes piano","w":0.84,"a":"production"},{"t":"groovy bass","w":0.76,"a":"bass"},{"t":"soulful vocals","w":0.68,"a":"melody"},{"t":"jazzy chords","w":0.6,"a":"harmony"},{"t":"pocket groove","w":0.52,"a":"production"}],"ex":["EDM","metal","aggressive trap"],"ti":1},{"s":"contemporary_rb","n":"Contemporary R&B","k":"컨템포러리 R&B","h":"main","cat":"R&B / Soul","bL":60,"bH":100,"ei":["Smooth","Synths"],"em":["Smooth","sensual","polished"],"pt":[{"t":"contemporary R&B","w":1.0,"a":"rhythm"},{"t":"polished","w":0.92,"a":"sound_design"},{"t":"melismatic vocals","w":0.84,"a":"melody"},{"t":"synths","w":0.76,"a":"production"},{"t":"808s","w":0.68,"a":"bass"},{"t":"smooth","w":0.6,"a":"production"},{"t":"80 BPM","w":0.52,"a":"rhythm"}],"ex":["metal","punk","raw rock"],"ti":1},{"s":"classic_soul","n":"Classic Soul","k":"클래식 소울","h":"sub","cat":"R&B / Soul","bL":90,"bH":130,"ei":["Motown groove","Horns"],"em":["Warm","uplifting","gospel-rooted"],"pt":[{"t":"classic soul","w":1.0,"a":"genre_label"},{"t":"horns","w":0.92,"a":"production"},{"t":"organ","w":0.84,"a":"production"},{"t":"Motown groove","w":0.76,"a":"production"},{"t":"gospel vocals","w":0.68,"a":"melody"},{"t":"warm","w":0.6,"a":"sound_design"},{"t":"110 BPM","w":0.52,"a":"rhythm"}],"ex":["EDM","metal","trap"],"ti":2},{"s":"funk","n":"Funk","k":"펑크","h":"main","cat":"R&B / Soul","bL":90,"bH":120,"ei":["Syncopated","clavinet"],"em":["Groovy","tight","danceable"],"pt":[{"t":"funk","w":1.0,"a":"genre_label"},{"t":"slap bass","w":0.92,"a":"bass"},{"t":"clavinet","w":0.84,"a":"production"},{"t":"wah guitar","w":0.76,"a":"production"},{"t":"syncopated groove","w":0.68,"a":"production"},{"t":"tight","w":0.6,"a":"production"},{"t":"100 BPM","w":0.52,"a":"rhythm"}],"ex":["ambient","metal","lo-fi acoustic"],"ti":2},{"s":"disco","n":"Disco","k":"디스코","h":"sub","cat":"R&B / Soul","bL":110,"bH":135,"ei":["Four-on-the-floor","four-on-the-floor kick","Strings"],"em":["Groovy","celebratory","euphoric"],"pt":[{"t":"disco","w":1.0,"a":"genre_label"},{"t":"four-on-the-floor","w":0.92,"a":"production"},{"t":"lush strings","w":0.84,"a":"production"},{"t":"groovy bassline","w":0.76,"a":"bass"},{"t":"120 BPM","w":0.68,"a":"rhythm"}],"ex":["metal","punk","ambient"],"ti":1},{"s":"nudisco","n":"Nu-Disco","k":"뉴 디스코","h":"micro","cat":"R&B / Soul","bL":115,"bH":130,"ei":["Four-on-the-floor","Four-on-the-floor","modern synths"],"em":["Retro","groovy","modern"],"pt":[{"t":"nu-disco","w":1.0,"a":"genre_label"},{"t":"modern production","w":0.92,"a":"production"},{"t":"filtered bass","w":0.84,"a":"bass"},{"t":"retro groove","w":0.76,"a":"production"},{"t":"124 BPM","w":0.68,"a":"rhythm"}],"ex":["metal","punk","raw rock"],"ti":2},{"s":"gospel","n":"Gospel","k":"가스펠","h":"sub","cat":"R&B / Soul","bL":60,"bH":140,"ei":["Dynamic builds","Piano/organ"],"em":["Uplifting","spiritual","powerful"],"pt":[{"t":"gospel","w":1.0,"a":"genre_label"},{"t":"powerful vocals","w":0.92,"a":"melody"},{"t":"choir harmonies","w":0.84,"a":"melody"},{"t":"Hammond organ","w":0.76,"a":"production"},{"t":"uplifting","w":0.68,"a":"production"},{"t":"spiritual","w":0.6,"a":"production"}],"ex":["dark","metal","EDM"],"ti":2},{"s":"latin_jazz","n":"Latin Jazz","k":"라틴 재즈","h":"sub","cat":"Jazz","bL":100,"bH":200,"ei":["Clave rhythm","Congas"],"em":["High energy","rhythmic","celebratory"],"pt":[{"t":"Latin jazz","w":1.0,"a":"harmony"},{"t":"Afro-Cuban","w":0.92,"a":"production"},{"t":"clave rhythm","w":0.84,"a":"production"},{"t":"congas","w":0.76,"a":"production"},{"t":"timbales","w":0.68,"a":"production"},{"t":"high energy","w":0.6,"a":"production"},{"t":"140 BPM","w":0.52,"a":"rhythm"}],"ex":["metal","EDM","ambient"],"ti":2},{"s":"traditional_country","n":"Traditional Country","k":"트래디셔널 컨트리","h":"main","cat":"World / Folk","bL":60,"bH":100,"ei":["Straight","Acoustic guitar"],"em":["Storytelling","warm","heartfelt"],"pt":[{"t":"country","w":1.0,"a":"genre_label"},{"t":"acoustic guitar","w":0.92,"a":"production"},{"t":"pedal steel","w":0.84,"a":"production"},{"t":"fiddle","w":0.76,"a":"production"},{"t":"twangy vocals","w":0.68,"a":"melody"},{"t":"storytelling","w":0.6,"a":"production"},{"t":"85 BPM","w":0.52,"a":"rhythm"}],"ex":["EDM","metal","trap"],"ti":1},{"s":"bluegrass","n":"Bluegrass","k":"블루그래스","h":"sub","cat":"World / Folk","bL":120,"bH":180,"ei":["Fast picking","Banjo"],"em":["Fast","upbeat","Appalachian"],"pt":[{"t":"bluegrass","w":1.0,"a":"genre_label"},{"t":"banjo","w":0.92,"a":"production"},{"t":"mandolin","w":0.84,"a":"production"},{"t":"fiddle","w":0.76,"a":"production"},{"t":"fast picking","w":0.68,"a":"production"},{"t":"vocal harmonies","w":0.6,"a":"melody"},{"t":"150 BPM","w":0.52,"a":"rhythm"}],"ex":["EDM","trap","metal"],"ti":2},{"s":"americana","n":"Americana","k":"아메리카나","h":"sub","cat":"World / Folk","bL":80,"bH":130,"ei":["Varied","Acoustic guitar"],"em":["Warm","roots","lyric-focused"],"pt":[{"t":"Americana","w":1.0,"a":"genre_label"},{"t":"roots","w":0.92,"a":"production"},{"t":"pedal steel","w":0.84,"a":"production"},{"t":"acoustic guitar","w":0.76,"a":"production"},{"t":"lyric-focused","w":0.68,"a":"production"},{"t":"warm","w":0.6,"a":"sound_design"},{"t":"100 BPM","w":0.52,"a":"rhythm"}],"ex":["EDM","trap","metal"],"ti":2},{"s":"folk","n":"Folk","k":"포크","h":"main","cat":"World / Folk","bL":70,"bH":120,"ei":["Simple","Acoustic guitar"],"em":["Intimate","storytelling","simple"],"pt":[{"t":"folk","w":1.0,"a":"genre_label"},{"t":"acoustic guitar","w":0.92,"a":"production"},{"t":"harmonica","w":0.84,"a":"production"},{"t":"storytelling","w":0.76,"a":"production"},{"t":"simple","w":0.68,"a":"production"},{"t":"intimate","w":0.6,"a":"production"},{"t":"90 BPM","w":0.52,"a":"rhythm"}],"ex":["EDM","metal","aggressive"],"ti":1},{"s":"indie_folk","n":"Indie Folk","k":"인디 포크","h":"sub","cat":"World / Folk","bL":80,"bH":130,"ei":["Relaxed","Acoustic guitar"],"em":["Intimate","warm","organic"],"pt":[{"t":"indie folk","w":1.0,"a":"genre_label"},{"t":"acoustic","w":0.92,"a":"production"},{"t":"intimate","w":0.84,"a":"production"},{"t":"layered harmonies","w":0.76,"a":"production"},{"t":"lo-fi warmth","w":0.68,"a":"sound_design"},{"t":"100 BPM","w":0.6,"a":"rhythm"}],"ex":["EDM","metal","trap"],"ti":1},{"s":"reggaeton","n":"Reggaeton","k":"레게톤","h":"main","cat":"World / Folk","bL":80,"bH":105,"ei":["Dembow beat","Drum machine (dembow beat)","synths"],"em":["Rhythmic","danceable","Latin"],"pt":[{"t":"reggaeton","w":1.0,"a":"genre_label"},{"t":"dembow beat","w":0.92,"a":"drums"},{"t":"heavy bass","w":0.84,"a":"bass"},{"t":"rhythmic","w":0.76,"a":"production"},{"t":"Latin","w":0.68,"a":"production"},{"t":"95 BPM","w":0.6,"a":"rhythm"}],"ex":["metal","folk","ambient"],"ti":1},{"s":"salsa","n":"Salsa","k":"살사","h":"sub","cat":"World / Folk","bL":150,"bH":250,"ei":["Clave rhythm","Congas"],"em":["High energy","celebratory"],"pt":[{"t":"salsa","w":1.0,"a":"genre_label"},{"t":"Afro-Cuban","w":0.92,"a":"production"},{"t":"clave rhythm","w":0.84,"a":"production"},{"t":"brass","w":0.76,"a":"production"},{"t":"congas","w":0.68,"a":"production"},{"t":"high energy","w":0.6,"a":"production"},{"t":"180 BPM","w":0.52,"a":"rhythm"}],"ex":["metal","EDM","ambient"],"ti":2},{"s":"cumbia","n":"Cumbia","k":"쿰비아","h":"sub","cat":"World / Folk","bL":80,"bH":120,"ei":["Shuffle rhythm","drums","Accordion"],"em":["Danceable","festive","warm"],"pt":[{"t":"cumbia","w":1.0,"a":"genre_label"},{"t":"accordion","w":0.92,"a":"production"},{"t":"shuffle rhythm","w":0.84,"a":"production"},{"t":"Latin","w":0.76,"a":"production"},{"t":"danceable","w":0.68,"a":"production"},{"t":"100 BPM","w":0.6,"a":"rhythm"}],"ex":["metal","EDM","dark"],"ti":2},{"s":"reggae","n":"Reggae","k":"레게","h":"main","cat":"World / Folk","bL":60,"bH":90,"ei":["Off-beat skank","Off-beat guitar (skank)"],"em":["Laid-back","conscious","warm"],"pt":[{"t":"reggae","w":1.0,"a":"genre_label"},{"t":"off-beat guitar","w":0.92,"a":"drums"},{"t":"heavy bass","w":0.84,"a":"bass"},{"t":"laid-back","w":0.76,"a":"production"},{"t":"one drop beat","w":0.68,"a":"drums"},{"t":"75 BPM","w":0.6,"a":"rhythm"}],"ex":["metal","EDM","fast"],"ti":1},{"s":"dub","n":"Dub","k":"더브","h":"sub","cat":"World / Folk","bL":60,"bH":90,"ei":["One-drop","echo/reverb"],"em":["Spacious","echo-drenched","bass-heavy"],"pt":[{"t":"dub","w":1.0,"a":"genre_label"},{"t":"heavy reverb","w":0.92,"a":"sound_design"},{"t":"echo","w":0.84,"a":"production"},{"t":"bass-heavy","w":0.76,"a":"bass"},{"t":"stripped-back","w":0.68,"a":"production"},{"t":"spacious","w":0.6,"a":"production"},{"t":"75 BPM","w":0.52,"a":"rhythm"}],"ex":["bright pop","fast","metal"],"ti":2},{"s":"dancehall","n":"Dancehall","k":"댄스홀","h":"sub","cat":"World / Folk","bL":90,"bH":110,"ei":["Digital riddim","Drum machine (riddim)","synths"],"em":["Energetic","party","Caribbean"],"pt":[{"t":"dancehall","w":1.0,"a":"genre_label"},{"t":"digital riddim","w":0.92,"a":"production"},{"t":"energetic","w":0.84,"a":"mood"},{"t":"toasting vocals","w":0.76,"a":"melody"},{"t":"100 BPM","w":0.68,"a":"rhythm"}],"ex":["metal","ambient","folk"],"ti":2},{"s":"afrobeats","n":"Afrobeats","k":"아프로비츠","h":"main","cat":"World / Folk","bL":100,"bH":115,"ei":["Complex polyrhythms","Percussion","synths"],"em":["Groovy","danceable","rhythmic"],"pt":[{"t":"Afrobeats","w":1.0,"a":"drums"},{"t":"complex polyrhythms","w":0.92,"a":"production"},{"t":"percussive","w":0.84,"a":"production"},{"t":"groovy","w":0.76,"a":"production"},{"t":"West African","w":0.68,"a":"production"},{"t":"108 BPM","w":0.6,"a":"rhythm"}],"ex":["metal","punk","dark ambient"],"ti":1},{"s":"ska","n":"Ska","k":"스카","h":"sub","cat":"World / Folk","bL":100,"bH":150,"ei":["Upstroke guitar","Upstroke guitar"],"em":["Upbeat","energetic","party"],"pt":[{"t":"ska","w":1.0,"a":"genre_label"},{"t":"upstroke guitar","w":0.92,"a":"production"},{"t":"brass section","w":0.84,"a":"arrangement"},{"t":"walking bass","w":0.76,"a":"bass"},{"t":"upbeat","w":0.68,"a":"drums"},{"t":"130 BPM","w":0.6,"a":"rhythm"}],"ex":["ambient","dark","metal"],"ti":2},{"s":"blues","n":"Blues","k":"블루스","h":"main","cat":"Cinematic","bL":60,"bH":120,"ei":["Shuffle/straight","Electric/acoustic guitar"],"em":["Expressive","raw","soulful"],"pt":[{"t":"blues","w":1.0,"a":"genre_label"},{"t":"12-bar blues","w":0.92,"a":"production"},{"t":"electric guitar","w":0.84,"a":"production"},{"t":"harmonica","w":0.76,"a":"production"},{"t":"expressive","w":0.68,"a":"production"},{"t":"raw","w":0.6,"a":"sound_design"},{"t":"90 BPM","w":0.52,"a":"rhythm"}],"ex":["EDM","pop","bright"],"ti":2},{"s":"delta_blues","n":"Delta Blues","k":"델타 블루스","h":"sub","cat":"Cinematic","bL":60,"bH":100,"ei":["Solo acoustic","Acoustic guitar"],"em":["Raw","emotive","solo"],"pt":[{"t":"Delta blues","w":1.0,"a":"genre_label"},{"t":"acoustic guitar","w":0.92,"a":"production"},{"t":"slide guitar","w":0.84,"a":"production"},{"t":"raw","w":0.76,"a":"sound_design"},{"t":"solo","w":0.68,"a":"production"},{"t":"emotive","w":0.6,"a":"production"},{"t":"75 BPM","w":0.52,"a":"rhythm"}],"ex":["EDM","metal","pop"],"ti":2},{"s":"cinematic_film_score","n":"Cinematic / Film Score","k":"시네마틱","h":"main","cat":"Cinematic","bL":60,"bH":140,"ei":["Dynamic","percussion","Full orchestra"],"em":["Epic","emotional","dramatic"],"pt":[{"t":"cinematic orchestral score","w":1.0,"a":"genre_label"},{"t":"string ostinatos","w":0.92,"a":"production"},{"t":"brass swells","w":0.84,"a":"production"},{"t":"huge drums","w":0.76,"a":"drums"},{"t":"emotional arcs","w":0.68,"a":"mood"}],"ex":["pop","hip-hop","punk"],"ti":1},{"s":"tango","n":"Tango","k":"탱고","h":"sub","cat":"World / Folk","bL":60,"bH":80,"ei":["Staccato","Bandoneón"],"em":["Dramatic","passionate","intense"],"pt":[{"t":"tango","w":1.0,"a":"genre_label"},{"t":"bandoneón","w":0.92,"a":"production"},{"t":"dramatic pauses","w":0.84,"a":"production"},{"t":"passionate","w":0.76,"a":"production"},{"t":"staccato","w":0.68,"a":"production"},{"t":"70 BPM","w":0.6,"a":"rhythm"}],"ex":["EDM","pop","metal"],"ti":2},{"s":"samba","n":"Samba","k":"삼바","h":"sub","cat":"World / Folk","bL":90,"bH":120,"ei":["Polyrhythmic","Surdo"],"em":["Carnival","joyful","energetic"],"pt":[{"t":"samba","w":1.0,"a":"genre_label"},{"t":"Brazilian percussion","w":0.92,"a":"production"},{"t":"polyrhythmic","w":0.84,"a":"production"},{"t":"carnival energy","w":0.76,"a":"production"},{"t":"105 BPM","w":0.68,"a":"rhythm"}],"ex":["metal","dark ambient","EDM"],"ti":2},{"s":"slap_house","n":"Slap House","k":"슬랩 하우스","h":"micro","cat":"Electronic","bL":120,"bH":126,"ei":["Four-on-the-floor","Four-on-the-floor","vocal hooks"],"em":["Bouncy","instant","TikTok-friendly"],"pt":[{"t":"slap house","w":1.0,"a":"genre_label"},{"t":"bouncy bass","w":0.92,"a":"bass"},{"t":"short vocal hook","w":0.84,"a":"melody"},{"t":"club-ready","w":0.76,"a":"production"},{"t":"123 BPM","w":0.68,"a":"rhythm"}],"ex":["ambient","metal","acoustic"],"ti":2},{"s":"stutter_house","n":"Stutter House","k":"스터터 하우스","h":"micro","cat":"Electronic","bL":122,"bH":126,"ei":["Four-on-the-floor","Four-on-the-floor","Gated vocal chops"],"em":["Bouncy","choppy","club"],"pt":[{"t":"stutter house","w":1.0,"a":"genre_label"},{"t":"gated vocal chop","w":0.92,"a":"melody"},{"t":"bouncy groove","w":0.84,"a":"production"},{"t":"124 BPM","w":0.76,"a":"rhythm"}],"ex":["metal","ambient","acoustic"],"ti":3},{"s":"colour_bass","n":"Colour Bass","k":"컬러 베이스","h":"micro","cat":"Electronic","bL":140,"bH":150,"ei":["Half-time","supersaws"],"em":["Melodic","colorful","heavy"],"pt":[{"t":"colour bass","w":1.0,"a":"bass"},{"t":"chordal bass design","w":0.92,"a":"bass"},{"t":"melodic drop","w":0.84,"a":"arrangement"},{"t":"lush supersaws","w":0.76,"a":"production"},{"t":"145 BPM","w":0.68,"a":"rhythm"}],"ex":["acoustic","folk","country"],"ti":3},{"s":"wave","n":"Wave","k":"웨이브","h":"micro","cat":"Hip-Hop","bL":130,"bH":140,"ei":["Half-time","Ethereal pads"],"em":["Night-drive","ethereal","atmospheric"],"pt":[{"t":"wave","w":1.0,"a":"genre_label"},{"t":"night drive","w":0.92,"a":"production"},{"t":"ethereal pads","w":0.84,"a":"production"},{"t":"808 glide","w":0.76,"a":"bass"},{"t":"135 BPM","w":0.68,"a":"rhythm"}],"ex":["bright pop","country","folk"],"ti":3},{"s":"hardwave","n":"Hardwave","k":"하드웨이브","h":"micro","cat":"Electronic","bL":145,"bH":155,"ei":["Half-time","Dark pads"],"em":["Dark","euphoric","aggressive"],"pt":[{"t":"hardwave","w":1.0,"a":"genre_label"},{"t":"dark euphoric","w":0.92,"a":"mood"},{"t":"aggressive drop","w":0.84,"a":"arrangement"},{"t":"wide pads","w":0.76,"a":"production"},{"t":"150 BPM","w":0.68,"a":"rhythm"}],"ex":["acoustic","folk","soft"],"ti":4},{"s":"midtempo_bass","n":"Midtempo Bass","k":"미드템포 베이스","h":"micro","cat":"Electronic","bL":95,"bH":100,"ei":["Slow","industrial synths"],"em":["Robotic","industrial","heavy"],"pt":[{"t":"midtempo bass","w":1.0,"a":"rhythm"},{"t":"robotic bass groove","w":0.92,"a":"bass"},{"t":"industrial energy","w":0.84,"a":"production"},{"t":"97 BPM","w":0.76,"a":"rhythm"}],"ex":["acoustic","folk","bright pop"],"ti":3},{"s":"future_riddim","n":"Future Riddim","k":"퓨처 리딤","h":"micro","cat":"Electronic","bL":140,"bH":150,"ei":["Half-time","melodic synths"],"em":["Glitchy","melodic","heavy"],"pt":[{"t":"future riddim","w":1.0,"a":"genre_label"},{"t":"glitchy bass motif","w":0.92,"a":"bass"},{"t":"melodic drop","w":0.84,"a":"arrangement"},{"t":"145 BPM","w":0.76,"a":"rhythm"}],"ex":["acoustic","folk","country"],"ti":4},{"s":"tearout_dubstep","n":"Tearout Dubstep","k":"테어라웃 덥스텝","h":"micro","cat":"Electronic","bL":140,"bH":150,"ei":["Half-time","impact FX"],"em":["Savage","aggressive","brutal"],"pt":[{"t":"tearout dubstep","w":1.0,"a":"genre_label"},{"t":"savage bass growls","w":0.92,"a":"bass"},{"t":"impact-heavy","w":0.84,"a":"production"},{"t":"145 BPM","w":0.76,"a":"rhythm"}],"ex":["soft","acoustic","ambient"],"ti":4},{"s":"hybrid_trap","n":"Hybrid Trap","k":"하이브리드 트랩","h":"micro","cat":"Hip-Hop","bL":145,"bH":155,"ei":["Half-time + festival drops","brass hits"],"em":["Festival","massive","high-energy"],"pt":[{"t":"hybrid trap","w":1.0,"a":"melody"},{"t":"festival trap","w":0.92,"a":"melody"},{"t":"huge impacts","w":0.84,"a":"production"},{"t":"808 + brass hit","w":0.76,"a":"bass"},{"t":"150 BPM","w":0.68,"a":"rhythm"}],"ex":["acoustic","folk","ambient"],"ti":3},{"s":"phonk_house","n":"Phonk House","k":"퐁크 하우스","h":"micro","cat":"Electronic","bL":122,"bH":128,"ei":["Four-on-the-floor + cowbell","house kick","Cowbell"],"em":["Dark","bouncy","Memphis-meets-house"],"pt":[{"t":"phonk house","w":1.0,"a":"genre_label"},{"t":"cowbell","w":0.92,"a":"production"},{"t":"memphis vocal sample","w":0.84,"a":"melody"},{"t":"four-on-the-floor","w":0.76,"a":"production"},{"t":"125 BPM","w":0.68,"a":"rhythm"}],"ex":["acoustic","folk","orchestral"],"ti":3},{"s":"brazilian_phonk","n":"Brazilian Phonk","k":"브라질리안 퐁크","h":"micro","cat":"Hip-Hop","bL":135,"bH":145,"ei":["Club bounce","Aggressive cowbell"],"em":["Aggressive","bouncy","Brazilian"],"pt":[{"t":"brazilian phonk","w":1.0,"a":"genre_label"},{"t":"aggressive cowbell","w":0.92,"a":"mood"},{"t":"club bounce","w":0.84,"a":"production"},{"t":"140 BPM","w":0.76,"a":"rhythm"}],"ex":["acoustic","folk","ambient"],"ti":3},{"s":"jersey_club","n":"Jersey Club","k":"저지 클럽","h":"micro","cat":"Electronic","bL":130,"bH":140,"ei":["Bounce kick pattern","Bouncy kick patterns","vocal chants"],"em":["Bouncy","instant","club"],"pt":[{"t":"jersey club","w":1.0,"a":"genre_label"},{"t":"bounce kick pattern","w":0.92,"a":"drums"},{"t":"chant chop","w":0.84,"a":"production"},{"t":"135 BPM","w":0.76,"a":"rhythm"}],"ex":["ambient","folk","metal"],"ti":3},{"s":"breakcore","n":"Breakcore","k":"브레이크코어","h":"micro","cat":"Electronic","bL":180,"bH":200,"ei":["Ultra-fast chopped breaks","Chopped breakbeats","glitch FX"],"em":["Chaotic","extreme","glitch"],"pt":[{"t":"breakcore","w":1.0,"a":"genre_label"},{"t":"chopped breakbeats","w":0.92,"a":"drums"},{"t":"chaotic glitch","w":0.84,"a":"production"},{"t":"190 BPM","w":0.76,"a":"rhythm"}],"ex":["soft","ambient","country"],"ti":4},{"s":"pluggnb","n":"PluggnB","k":"플러그앤비","h":"micro","cat":"Hip-Hop","bL":135,"bH":145,"ei":["Half-time","Airy bell synths"],"em":["Melodic","emotional","airy"],"pt":[{"t":"pluggnb","w":1.0,"a":"genre_label"},{"t":"airy bell synths","w":0.92,"a":"production"},{"t":"melodic trap","w":0.84,"a":"melody"},{"t":"emotional autotune","w":0.76,"a":"mood"},{"t":"140 BPM","w":0.68,"a":"rhythm"}],"ex":["rock","metal","country"],"ti":3},{"s":"cinematic_trailer","n":"Cinematic Trailer","k":"시네마틱 트레일러","h":"micro","cat":"Cinematic","bL":80,"bH":140,"ei":["3-act structure","epic percussion","Hybrid orchestra"],"em":["Epic","massive","cinematic"],"pt":[{"t":"trailer music","w":1.0,"a":"genre_label"},{"t":"3-act build","w":0.92,"a":"arrangement"},{"t":"braams","w":0.84,"a":"production"},{"t":"epic percussion","w":0.76,"a":"production"},{"t":"cinematic impact","w":0.68,"a":"production"}],"ex":["pop","hip-hop","lo-fi"],"ti":2}];

const CATS=["All",...[...new Set(G.map(g=>g.cat))]];
const TIERS={1:{l:"Excellent",c:"#22c55e"},2:{l:"Good",c:"#3b82f6"},3:{l:"Caution",c:"#eab308"},4:{l:"Untested",c:"#ef4444"}};

const VOCAL_KEYWORDS = ["\\bvocal","\\bvoice","\\bsing\\b","\\bsinger","\\bsinging","\\brap\\b","\\brapper","\\bchoir\\b","\\bchant","\\bspoken\\b","\\blyrics\\b","\\bautotune","\\bauto-tune","\\bbreathy\\b","\\bmelismatic","\\bfalsetto","\\bbaritone","\\bsoprano","\\balto\\b","\\btenor\\b","\\bscat\\b","\\btoasting"];
const isVocalToken = (text) => VOCAL_KEYWORDS.some(pattern => new RegExp(pattern, "i").test(text));

function getFoundation(genres, bpmOvr, isInstrumental, weights) {
  const allT=[];
  const w=weights||[100];
  genres.forEach((g,i)=>{const m=(w[i]||0)/100;g.pt.forEach(t=>allT.push({...t,w:t.w*m}));});
  allT.sort((a,b)=>b.w-a.w);
  const seen=new Set();
  let uniq=allT.filter(t=>{if(seen.has(t.t.toLowerCase()))return false;seen.add(t.t.toLowerCase());return true;});
  if(isInstrumental) uniq=uniq.filter(t=>!isVocalToken(t.t));
  const tokens=uniq.filter(t=>!t.t.match(/^\d+ BPM$/)).slice(0,10);
  const bpm=bpmOvr||Math.round(genres.reduce((s,g)=>s+(g.bL+g.bH)/2,0)/genres.length);
  let base=tokens.map(t=>t.t).join(", ")+", "+bpm+" BPM";
  if(isInstrumental) base+=", instrumental";
  return base;
}

const SB_URL='https://jgfvwfalxnrdujaoqoiq.supabase.co/rest/v1';
const SB_KEY='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpnZnZ3ZmFseG5yZHVqYW9xb2lxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM2NTI4OTYsImV4cCI6MjA4OTIyODg5Nn0.amJtx-4ZGWi_psLbKte6z_W0oE1Ua9EWQxYVhHpatkc';
const sbH={'apikey':SB_KEY,'Authorization':`Bearer ${SB_KEY}`,'Content-Type':'application/json','Prefer':'return=representation'};
const sbInsert=(table,data)=>fetch(`${SB_URL}/${table}`,{method:'POST',headers:sbH,body:JSON.stringify(data)}).catch(()=>{});
const sbUpsert=(table,data)=>fetch(`${SB_URL}/${table}`,{method:'POST',headers:{...sbH,'Prefer':'return=representation,resolution=merge-duplicates'},body:JSON.stringify(data)}).catch(()=>{});
const sbUpdate=(table,match,data)=>fetch(`${SB_URL}/${table}?${match}`,{method:'PATCH',headers:{...sbH,'Prefer':'return=minimal'},body:JSON.stringify(data)}).catch(()=>{});
let _userIP='unknown';
const getIP=()=>_userIP;

export default function StylePrompter(){
  const[sel,setSel]=useState([]);
  const[search,setSearch]=useState("");
  const[cat,setCat]=useState("All");
  const[mode,setMode]=useState("full");
  const[bpm,setBpm]=useState("");
  const[mood,setMood]=useState("");
  const[vocal,setVocal]=useState("");
  const[extra,setExtra]=useState("");
  const[foundation,setFoundation]=useState("");
  const[performance,setPerformance]=useState("");
  const[editMode,setEditMode]=useState(false);
  const[combinedEdit,setCombinedEdit]=useState("");
  const[loading,setLoading]=useState(false);
  const[copied,setCopied]=useState("");
  const[threshold,setThreshold]=useState(0.6);
  const[instrumental,setInstrumental]=useState(false);
  const[randomize,setRandomize]=useState(0.7);
  const[fusionWeights,setFusionWeights]=useState([65,35]);
  const[showApiPanel,setShowApiPanel]=useState(false);
  const[showHistory,setShowHistory]=useState(false);
  const[analysisFile,setAnalysisFile]=useState(null);
  const[analysisResult,setAnalysisResult]=useState(null);
  const[analyzing,setAnalyzing]=useState(false);
  const[selectedHistoryId,setSelectedHistoryId]=useState(null);
  const ANALYZER_URL='https://web-production-53cf6.up.railway.app';

  const analyzeAudio=async()=>{
    if(!analysisFile)return;
    const target=history.find(h=>h.id===selectedHistoryId)||history[0];
    if(!target)return;
    markAnalyzed(target.id);
    setAnalyzing(true);setAnalysisResult(null);
    try{
      const fd=new FormData();
      fd.append('file',analysisFile);
      const promptForAnalysis=target.edits?.edited?target.edits.final:target.prompt;
      fd.append('prompt',promptForAnalysis);
      fd.append('prompt_type','style');
      fd.append('ip',getIP());
      if(target.sbId)fd.append('prompt_id',String(target.sbId));
      const r=await fetch(`${ANALYZER_URL}/analyze`,{method:'POST',body:fd});
      const d=await r.json();
      if(!r.ok)throw new Error(d.detail||'Analysis failed');
      setAnalysisResult(d);
      setAnalysisFile(null);
      if(!useBYOK)setFreeRemaining(prev=>prev+1);
    }catch(e){setAnalysisResult({error:e.message});}
    finally{setAnalyzing(false);}
  };

  // History + Upload gate system
  const loadHistory=()=>{try{const s=localStorage.getItem("suno_style_history");return s?JSON.parse(s):[];}catch{return[];}};
  const[history,setHistory]=useState(loadHistory);
  const pendingUpload=history.length>0&&!history[0].analyzed&&!history[0].hidden;
  const saveHistory=(h)=>{setHistory(h);try{localStorage.setItem("suno_style_history",JSON.stringify(h.slice(0,50)));}catch{}};
  const addToHistory=async(prompt,genres,mdl)=>{
    const entry={id:Date.now(),ts:new Date().toISOString(),genres:genres.map(g=>g.n),mode,model:mdl,prompt,instrumental,analyzed:false,
      edits:{original:prompt,final:prompt,edited:false},sbId:null
    };
    try{
      const r=await sbInsert('style_history',{ip:getIP(),genres:genres.map(g=>g.n),mode,model:mdl,prompt,instrumental,edit_original:prompt,edit_final:prompt,edited:false});
      const d=await r?.json?.();
      if(d?.[0]?.id)entry.sbId=d[0].id;
    }catch{}
    saveHistory([entry,...history]);
  };
  const markAnalyzed=(id)=>{saveHistory(history.map(x=>x.id===id?{...x,analyzed:true}:x));};
  const hideEntry=(id)=>{saveHistory(history.map(x=>x.id===id?{...x,hidden:true}:x));};
  const restoreEntry=(h)=>{
    // Restore genres by matching names
    const matched=h.genres?.map(name=>G.find(g=>g.n===name)).filter(Boolean)||[];
    if(matched.length>0)setSel(matched);
    if(h.mode)setMode(h.mode);
    setInstrumental(!!h.instrumental);
    // Restore prompt into edit mode
    const p=h.edits?.edited?h.edits.final:h.prompt;
    if(p){setPerformance(p);setEditMode(true);setCombinedEdit(p);}
    setShowHistory(false);
  };

  // Dual mode: Free (server proxy, 10/day) + BYOK (own key, unlimited)
  const[useBYOK,setUseBYOK]=useState(false);
  const[freeRemaining,setFreeRemaining]=useState(5);
  const LIMIT=5;
  const sbGetUsage=async()=>{
    try{const today=new Date().toISOString().slice(0,10);
    const r=await fetch(`${SB_URL}/rate_limits?ip=eq.${getIP()}&date=eq.${today}&select=count`,{headers:{'apikey':SB_KEY,'Authorization':`Bearer ${SB_KEY}`}});
    const d=await r.json();return d?.[0]?.count||0;}catch{return 0;}
  };
  const sbIncrementUsage=async()=>{
    try{const today=new Date().toISOString().slice(0,10);const current=await sbGetUsage();
    await sbUpsert('rate_limits',{ip:getIP(),date:today,count:current+1});
    setFreeRemaining(Math.max(0,LIMIT-current-1));
    window.dispatchEvent(new Event('usage-changed'));}catch{}
  };
  useEffect(()=>{fetch('https://api.ipify.org?format=json').then(r=>r.json()).then(d=>{_userIP=d.ip;return sbGetUsage();}).then(used=>setFreeRemaining(Math.max(0,LIMIT-used))).catch(()=>{});
    const syncUsage=()=>{if(getIP())sbGetUsage().then(used=>setFreeRemaining(Math.max(0,LIMIT-used))).catch(()=>{});};
    window.addEventListener('usage-changed',syncUsage);
    // Recover history from Supabase if localStorage is empty
    const local=loadHistory();
    if(local.length===0){
      fetch(`${SB_URL}/style_history?ip=eq.${getIP()}&order=created_at.desc&limit=50&select=id,created_at,genres,mode,model,instrumental,prompt,edit_original,edit_final,edited,rating`,{headers:{'apikey':SB_KEY,'Authorization':`Bearer ${SB_KEY}`}})
        .then(r=>r.json()).then(rows=>{if(rows?.length>0){const recovered=rows.map(r=>({id:r.id,ts:r.created_at,genres:r.genres||[],mode:r.mode,model:r.model,prompt:r.prompt,instrumental:r.instrumental,analyzed:!!r.rating,hidden:false,edits:{original:r.edit_original||r.prompt,final:r.edit_final||r.prompt,edited:!!r.edited},sbId:r.id}));saveHistory(recovered);}}).catch(()=>{});
    }
    return ()=>window.removeEventListener('usage-changed',syncUsage);
  },[]);
  const PROVIDERS={
    anthropic:{label:"Anthropic",placeholder:"sk-ant-xxx...",models:[{id:"claude-opus-4-6",n:"Opus 4.6"},{id:"claude-sonnet-4-6",n:"Sonnet 4.6"}]},
    openai:{label:"OpenAI",placeholder:"sk-xxx...",models:[{id:"gpt-5.4",n:"GPT-5.4"},{id:"gpt-5.3",n:"GPT-5.3"},{id:"gpt-4o",n:"GPT-4o"}]},
    gemini:{label:"Gemini (AI Studio)",placeholder:"AIzaSy...",models:[{id:"gemini-3.1-pro-preview",n:"3.1 Pro"},{id:"gemini-2.5-flash-lite",n:"2.5 Flash-Lite ⚡ Free"},{id:"gemini-2.5-flash",n:"2.5 Flash ⚡ Free"}]},
    groq:{label:"Groq ⚡ Free",placeholder:"gsk_xxx...",models:[{id:"llama-3.3-70b-versatile",n:"Llama 3.3 70B ⚡"},{id:"llama-3.1-8b-instant",n:"Llama 3.1 8B ⚡"},{id:"gemma2-9b-it",n:"Gemma2 9B ⚡"},{id:"mixtral-8x7b-32768",n:"Mixtral 8x7B ⚡"}]}
  };
  const loadKeys=()=>{try{const s=localStorage.getItem("suno_api_keys");return s?JSON.parse(s):{};}catch{return{};}};
  const[apiKeys,setApiKeys]=useState(loadKeys);
  const saveKey=(provider,key)=>{const next={...apiKeys,[provider]:key};setApiKeys(next);try{localStorage.setItem("suno_api_keys",JSON.stringify(next));}catch{}};
  const removeKey=(provider)=>{const next={...apiKeys};delete next[provider];setApiKeys(next);try{localStorage.setItem("suno_api_keys",JSON.stringify(next));}catch{}if(aiModel&&PROVIDERS[provider]?.models.some(m=>m.id===aiModel)){const remaining=Object.keys(next).filter(p=>next[p]);if(remaining.length>0)setAiModel(PROVIDERS[remaining[0]].models[0].id);else setAiModel("");}};
  const[keyInputs,setKeyInputs]=useState({});

  const availModels=Object.entries(PROVIDERS).flatMap(([p,cfg])=>apiKeys[p]?cfg.models.map(m=>({...m,provider:p})):[]);
  const[aiModel,setAiModel]=useState(()=>{const k=loadKeys();const firstProvider=Object.keys(k).find(p=>k[p]);return firstProvider?PROVIDERS[firstProvider].models[0].id:"claude-opus-4-6";});

  const callAI=async(system,userMsg)=>{
    if(!useBYOK){
      // Check Supabase rate limit first
      const used=await sbGetUsage();
      if(used>=LIMIT)throw new Error(`Daily limit reached (${LIMIT}/day). Enter your own API key in ⚙ for unlimited.`);
      // Free mode: server proxy
      const r=await fetch("/api/generate",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({system,messages:[{role:"user",content:userMsg}],temperature:randomize})});
      const text=await r.text();
      let d;try{d=JSON.parse(text);}catch{throw new Error("Server returned invalid response. Try again.");}
      if(!r.ok)throw new Error(d.error||"Server error");
      // Increment Supabase rate limit on success
      await sbIncrementUsage();
      return(d.content?.map(b=>b.type==="text"?b.text:"").join("")||"").trim();
    }
    // BYOK mode
    const modelInfo=availModels.find(m=>m.id===aiModel);
    if(!modelInfo)throw new Error("No API key registered. Add your key in ⚙ settings.");
    const key=apiKeys[modelInfo.provider];
    if(!key)throw new Error(`No API key for ${PROVIDERS[modelInfo.provider].label}.`);
    if(modelInfo.provider==="anthropic"){
      const r=await fetch("https://api.anthropic.com/v1/messages",{method:"POST",headers:{"Content-Type":"application/json","x-api-key":key,"anthropic-version":"2023-06-01","anthropic-dangerous-direct-browser-access":"true"},body:JSON.stringify({model:aiModel,max_tokens:1000,temperature:randomize,system,messages:[{role:"user",content:userMsg}]})});
      const d=await r.json();if(!r.ok)throw new Error(d.error?.message||"Anthropic API error");
      return(d.content?.map(b=>b.type==="text"?b.text:"").join("")||"").trim();
    }else if(modelInfo.provider==="gemini"){
      const r=await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${aiModel}:generateContent?key=${key}`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({system_instruction:{parts:[{text:system}]},contents:[{role:"user",parts:[{text:userMsg}]}],generationConfig:{temperature:randomize,maxOutputTokens:1000}})});
      const d=await r.json();if(!r.ok)throw new Error(d.error?.message||"Gemini API error");
      return(d.candidates?.[0]?.content?.parts?.[0]?.text||"").trim();
    }else if(modelInfo.provider==="groq"){
      const r=await fetch("https://api.groq.com/openai/v1/chat/completions",{method:"POST",headers:{"Content-Type":"application/json","Authorization":`Bearer ${key}`},body:JSON.stringify({model:aiModel,max_tokens:1000,temperature:randomize,messages:[{role:"system",content:system},{role:"user",content:userMsg}]})});
      const d=await r.json();if(!r.ok)throw new Error(d.error?.message||"Groq API error");
      return(d.choices?.[0]?.message?.content||"").trim();
    }else{
      const r=await fetch("https://api.openai.com/v1/chat/completions",{method:"POST",headers:{"Content-Type":"application/json","Authorization":`Bearer ${key}`},body:JSON.stringify({model:aiModel,max_tokens:1000,temperature:randomize,messages:[{role:"system",content:system},{role:"user",content:userMsg}]})});
      const d=await r.json();if(!r.ok)throw new Error(d.error?.message||"OpenAI API error");
      return(d.choices?.[0]?.message?.content||"").trim();
    }
  };

  const filtered=useMemo(()=>{
    const q=search.toLowerCase();
    return G.filter(g=>{
      if(cat!=="All"&&g.cat!==cat)return false;
      if(!q)return true;
      return g.n.toLowerCase().includes(q)||g.k.includes(q)||g.s.includes(q)||g.em.some(e=>e.toLowerCase().includes(q));
    });
  },[search,cat]);

  const toggle=useCallback(g=>{
    setSel(prev=>{
      if(prev.find(p=>p.s===g.s))return prev.filter(p=>p.s!==g.s);
      if(prev.length>=3)return[prev[1],prev[2],g];
      return[...prev,g];
    });
    setPerformance("");
  },[]);

  // Auto-adjust weights when genre count changes
  const getWeights=useCallback(()=>{
    if(sel.length<=1)return[100];
    if(sel.length===2)return fusionWeights.length===2?fusionWeights:[65,35];
    if(sel.length===3)return fusionWeights.length===3?fusionWeights:[50,30,20];
    return[100];
  },[sel.length,fusionWeights]);

  // When genre count changes, reset weights to defaults
  const prevCountRef=useRef(0);
  useMemo(()=>{
    if(sel.length!==prevCountRef.current){
      if(sel.length===2)setFusionWeights([65,35]);
      if(sel.length===3)setFusionWeights([50,30,20]);
      prevCountRef.current=sel.length;
    }
  },[sel.length]);

  useMemo(()=>{
    if(sel.length>0)setFoundation(getFoundation(sel,bpm?parseInt(bpm):null,instrumental,getWeights()));
    else setFoundation("");
  },[sel,bpm,instrumental,fusionWeights]);

  const generatePerformance=async()=>{
    if(sel.length===0)return;
    setLoading(true);
    const w=getWeights();
    const roleNames=["PRIMARY","SECONDARY","TERTIARY"];
    const genreInfo=sel.map((g,i)=>({name:g.n,role:sel.length>1?`${roleNames[i]} (${w[i]}%)`:"SINGLE",bpm:`${g.bL}-${g.bH}`,essential_identity:g.ei,emotion:g.em,tokens:g.pt.map(t=>`${t.t} (${t.a}, w:${t.w})`),exclude:g.ex,negative:g.nt}));
    const targetBpm=bpm||Math.round(sel.reduce((s,g)=>s+(g.bL+g.bH)/2,0)/sel.length);
    const sysPrompt=`You are an expert Suno V5 prompt engineer. Write the PERFORMANCE section of a Suno style prompt.

CRITICAL RULES:
- Write flowing, evocative English prose — NOT a tag list
- Describe sonic textures, spatial qualities, rhythmic feel, dynamic movement
- Use producer language: "warm analog warmth bleeds through the mix", "kicks punch through a tight sidechain"
- Include arrangement/energy arc direction
- Aim for 550-750 characters. Use the full range — longer is better. Foundation takes ~250 of the 1000-char limit.
- Do NOT repeat genre names or BPM (already in Foundation)
- Do NOT use [Verse]/[Chorus] brackets — Style field only
- Do NOT include any negative/exclude instructions (e.g. "no X", "avoid Y") — those go in a separate field, NOT in the style prompt. Every token in your output should be a POSITIVE description.
- If fusion: describe the sonic interaction between genres — which drives groove vs melody vs texture. For 3-genre fusion, the TERTIARY genre should add texture/color without competing for structural dominance.
- Reference specific sonic qualities: transient character, frequency balance, stereo width, reverb tail length
${instrumental ? "- THIS IS INSTRUMENTAL ONLY. Do NOT mention any vocals, singing, vocal chops, voice, rapper, singer, choir, or any vocal-related element whatsoever. Focus entirely on instruments, textures, rhythm, and production." : ""}

═══ SUNO TOKEN PRIORITY RULES (from empirical testing) ═══
Suno has a hidden priority hierarchy. AVOID creating conflicting tokens:
1. Genre archetype energy OVERRIDES explicit BPM. Do NOT pair slow BPM with inherently fast genres (e.g. "trailer music" + "85 BPM" will conflict — trailer always wins at 120+).
2. Energy tokens OVERRIDE mood tokens. "energetic" will cancel out "gentle/airy/organic". Choose one energy direction.
3. Mainstream genre templates OVERRIDE sub-genre specifics. "Latin" → salsa (not bossa nova). If you want bossa nova, do NOT also say "energetic".
4. Suno IGNORES "dark/gritty/menacing" for genres that aren't inherently dark. "dark house" → melodic house. Only inherently dark genres (doom metal, industrial) produce dark output.
5. Suno IGNORES specific instrument requests (nylon guitar, gayageum, Rhodes) — it substitutes generic synths. Describe the TEXTURE instead of the instrument name.
6. Suno FOLLOWS: specific BPM numbers (~98% accuracy when no genre conflict), key/scale, "no vocals", negative prompts (-pop, -country).
7. If the user's mood/direction conflicts with the genre's natural energy, prioritize the genre's energy and adjust the description to be COMPATIBLE, or warn the user.

OUTPUT: Just the performance description. No labels, no markdown, no quotation marks.`;
    const userMsg=`Genre data:\n${JSON.stringify(genreInfo,null,2)}\n\nTarget BPM: ${targetBpm}\n${mood?`Mood: ${mood}`:""}\n${vocal&&!instrumental?`Vocal: ${vocal}`:""}\n${instrumental?"INSTRUMENTAL ONLY — no vocals of any kind.":""}\n${extra?`Direction: ${extra}`:""}\n\nWrite the Performance description.`;
    try{
      const result=await callAI(sysPrompt,userMsg);
      setPerformance(result);
      setEditMode(false);
      setCombinedEdit("");
      const fp=getFoundation(sel,bpm?parseInt(bpm):null,instrumental,getWeights())+(result?". "+result:"");
      await addToHistory(fp,sel,useBYOK?aiModel:"claude-sonnet-4-6");
    }catch(e){setPerformance("Error: "+e.message);}
    setLoading(false);
  };

  const fullPrompt=foundation+(performance?". "+performance:"");
  const compactPrompt=useMemo(()=>{
    if(!sel.length)return"";
    const w=sel.length<=1?[100]:fusionWeights;
    const allT=[];sel.forEach((g,i)=>{const m=(w[i]||0)/100;g.pt.forEach(t=>allT.push({...t,w:t.w*m}));});
    allT.sort((a,b)=>b.w-a.w);const seen=new Set();
    let uniq=allT.filter(t=>{if(seen.has(t.t.toLowerCase()))return false;seen.add(t.t.toLowerCase());return true;});
    if(instrumental)uniq=uniq.filter(t=>!isVocalToken(t.t));
    let toks=uniq.filter(t=>t.w>=threshold&&!t.t.match(/^\d+ BPM$/)).map(t=>t.t);
    const bv=bpm||Math.round(sel.reduce((s,g)=>s+(g.bL+g.bH)/2,0)/sel.length);
    toks.push(`${bv} BPM`);if(instrumental)toks.push("instrumental");if(mood)toks.push(mood);if(!instrumental&&vocal)toks.push(vocal);
    let p=toks.join(", ");while(p.length>200&&toks.length>4){toks.splice(-2,1);p=toks.join(", ");}return p;
  },[sel,threshold,bpm,mood,vocal,instrumental,fusionWeights]);

  const negPrompt=[...new Set(sel.flatMap(g=>g.ex))].slice(0,4);

  const copy=(text,label)=>{
    try {
      const ta=document.createElement("textarea");
      ta.value=text;ta.style.position="fixed";ta.style.opacity="0";
      document.body.appendChild(ta);ta.select();document.execCommand("copy");document.body.removeChild(ta);
      setCopied(label);setTimeout(()=>setCopied(""),1500);
    } catch(e) {
      try { navigator.clipboard.writeText(text).then(()=>{setCopied(label);setTimeout(()=>setCopied(""),1500);}); } catch(e2) { console.error("Copy failed",e2); }
    }
  };
  const iS={width:"100%",background:"#0e0e14",border:"1px solid #1a1a28",borderRadius:4,padding:7,color:"#d0d0d8",fontSize:10,fontFamily:"inherit",outline:"none"};

  return(
    <div style={{fontFamily:"'Pretendard Variable',-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif",background:"#08080d",color:"#d0d0d8",minHeight:"100vh",padding:16}}>
      <style>{`@import url('https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.min.css');*{box-sizing:border-box;margin:0;padding:0}::-webkit-scrollbar{width:5px}::-webkit-scrollbar-thumb{background:#333;border-radius:3px}input,select,textarea{font-family:inherit}`}</style>

      <div style={{display:"flex",alignItems:"baseline",gap:12,marginBottom:10,paddingBottom:8,borderBottom:"1px solid #151520"}}>
        <h1 style={{fontSize:17,fontWeight:700,color:"#a78bfa",letterSpacing:-.5}}>SUNO PROMPT COMPOSER</h1>
        <span style={{fontSize:10,color:"#333"}}>v3 · 3-Genre Fusion · BYOK</span>
        <div style={{marginLeft:"auto",display:"flex",alignItems:"center",gap:8}}>
          <span style={{fontSize:8,color:"#22c55e"}}>{useBYOK?`● BYOK: ${Object.keys(apiKeys).filter(p=>apiKeys[p]).map(p=>PROVIDERS[p].label).join(" + ")||"No key"}`:`● Free: Sonnet 4.6 · ${freeRemaining}/${LIMIT} today`}</span>
          <button onClick={()=>setShowHistory(!showHistory)} style={{background:showHistory?"#1a1a28":"transparent",border:"1px solid #1a1a28",borderRadius:4,padding:"4px 8px",color:"#666",fontSize:9,cursor:"pointer",fontFamily:"inherit"}}>{history.filter(h=>!h.hidden).length>0?`📋 ${history.filter(h=>!h.hidden).length}`:""}</button>
          <button onClick={()=>setShowApiPanel(!showApiPanel)} style={{background:showApiPanel?"#1a1030":"transparent",border:showApiPanel?"1px solid #7c3aed":"1px solid #2a1a40",borderRadius:6,padding:"5px 12px",color:showApiPanel?"#a78bfa":"#7c3aed",fontSize:10,cursor:"pointer",fontFamily:"inherit",fontWeight:600,transition:"all 0.2s"}}>🔑 API</button>
        </div>
      </div>

      {showApiPanel&&(
        <div style={{background:"linear-gradient(135deg,#0c0c16,#12101e)",border:"1px solid #2a1a40",borderRadius:8,padding:16,marginBottom:12,marginLeft:16,marginRight:16,boxShadow:"0 4px 20px rgba(124,58,237,0.1)"}}>
          <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:12}}>
            <span style={{fontSize:12,fontWeight:700,color:"#a78bfa"}}>🔑 AI Provider Settings</span>
            <span style={{fontSize:8,color:"#555",marginLeft:"auto"}}>Keys stored in browser only</span>
          </div>
          <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:12,padding:8,background:"#08080d",borderRadius:6}}>
            <span style={{fontSize:9,color:"#888",fontWeight:600}}>Mode:</span>
            <button onClick={()=>setUseBYOK(false)} style={{padding:"6px 14px",fontSize:9,borderRadius:6,border:!useBYOK?"1px solid #22c55e":"1px solid #1a1a28",cursor:"pointer",fontFamily:"inherit",fontWeight:600,background:!useBYOK?"#0a2010":"#0e0e14",color:!useBYOK?"#22c55e":"#555",transition:"all 0.2s"}}>🆓 Free · Sonnet 4.6 · {freeRemaining}/{LIMIT}</button>
            <button onClick={()=>setUseBYOK(true)} style={{padding:"6px 14px",fontSize:9,borderRadius:6,border:useBYOK?"1px solid #a78bfa":"1px solid #1a1a28",cursor:"pointer",fontFamily:"inherit",fontWeight:600,background:useBYOK?"#1a1030":"#0e0e14",color:useBYOK?"#a78bfa":"#555",transition:"all 0.2s"}}>🔑 BYOK · Unlimited</button>
          </div>
          {useBYOK&&(<>
            {Object.entries(PROVIDERS).map(([pid,cfg])=>{
              const isFree=cfg.label.includes("Free")||cfg.label.includes("⚡");
              return(
              <div key={pid} style={{display:"grid",gridTemplateColumns:"110px 1fr 60px",gap:8,alignItems:"center",marginBottom:6,padding:"6px 8px",background:apiKeys[pid]?"#0a1a10":"#08080d",borderRadius:6,border:apiKeys[pid]?"1px solid #1a3a1a":"1px solid #151520"}}>
                <div>
                  <span style={{fontSize:9,color:apiKeys[pid]?"#22c55e":"#888",fontWeight:600,display:"block"}}>{cfg.label}</span>
                  {isFree&&!apiKeys[pid]&&<span style={{fontSize:7,color:"#7c3aed"}}>무료 토큰 제공</span>}
                  {apiKeys[pid]&&<span style={{fontSize:7,color:"#555"}}>{cfg.models.length} models</span>}
                </div>
                {apiKeys[pid]?(
                  <div style={{fontSize:9,color:"#555",padding:"6px 8px",background:"#0e0e14",borderRadius:4,border:"1px solid #1a1a28",fontFamily:"monospace"}}>{"•".repeat(8)}...{apiKeys[pid].slice(-6)}</div>
                ):(
                  <input value={keyInputs[pid]||""} onChange={e=>setKeyInputs({...keyInputs,[pid]:e.target.value})} placeholder={cfg.placeholder} type="password" style={{...iS,borderColor:isFree?"#2a1a40":"#1a1a28"}}/>
                )}
                {apiKeys[pid]?(
                  <button onClick={()=>removeKey(pid)} style={{background:"transparent",border:"1px solid #3a1a1a",borderRadius:4,padding:"5px 8px",color:"#f87171",fontSize:8,cursor:"pointer",fontFamily:"inherit",fontWeight:600}}>Remove</button>
                ):(
                  <button onClick={()=>{if(keyInputs[pid]){saveKey(pid,keyInputs[pid]);setKeyInputs({...keyInputs,[pid]:""});if(!aiModel||!availModels.find(m=>m.id===aiModel))setAiModel(cfg.models[0].id);}}} disabled={!keyInputs[pid]} style={{background:keyInputs[pid]?"#a78bfa":"#1a1a28",border:"none",borderRadius:4,padding:"5px 8px",color:keyInputs[pid]?"#000":"#444",fontSize:8,cursor:keyInputs[pid]?"pointer":"default",fontFamily:"inherit",fontWeight:600}}>Save</button>
                )}
              </div>
            );})}
            <div style={{fontSize:8,color:"#555",marginTop:8,padding:"6px 8px",background:"#08080d",borderRadius:4,lineHeight:1.6}}>
              💡 <strong style={{color:"#a78bfa"}}>무료 키 발급:</strong> <a href="https://console.groq.com/keys" target="_blank" rel="noopener" style={{color:"#7c3aed",textDecoration:"underline"}}>Groq</a> · <a href="https://aistudio.google.com/apikey" target="_blank" rel="noopener" style={{color:"#7c3aed",textDecoration:"underline"}}>Gemini AI Studio</a> — 30초면 발급 완료, 무제한 사용 가능
            </div>
          </>)}
        </div>
      )}

      {showHistory&&(
        <div style={{background:"#0c0c12",border:"1px solid #1a1a28",borderRadius:6,padding:12,marginBottom:10,marginLeft:16,marginRight:16,maxHeight:250,overflowY:"auto"}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:8}}>
            <span style={{fontSize:9,color:"#555",textTransform:"uppercase",letterSpacing:1}}>Prompt History ({history.length})</span>
            {history.filter(h=>!h.hidden).length>0&&<button onClick={()=>{if(confirm("Hide all from view?"))saveHistory(history.map(h=>({...h,hidden:true})));}} style={{background:"transparent",border:"1px solid #2a1a1a",borderRadius:3,padding:"2px 8px",color:"#f87171",fontSize:8,cursor:"pointer",fontFamily:"inherit"}}>Clear All</button>}
          </div>
          {history.filter(h=>!h.hidden).length===0?<div style={{fontSize:9,color:"#333",padding:10,textAlign:"center"}}>No history yet</div>:
          history.filter(h=>!h.hidden).map(h=>(
            <div key={h.id} style={{background:"#08080d",borderRadius:4,padding:"8px 10px",marginBottom:4,border:`1px solid ${!h.analyzed?"#1a1040":"#1a1a24"}`}}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:4}}>
                <span style={{fontSize:9,color:"#888"}}>{h.genres?.join(" × ")} · {h.instrumental?"INST":"VOCAL"} · {h.model?.split("-").slice(-2).join(" ")}</span>
                <span style={{fontSize:8,color:"#444"}}>{new Date(h.ts).toLocaleDateString()} {new Date(h.ts).toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"})}</span>
              </div>
              <div style={{fontSize:8,color:"#555",maxHeight:40,overflow:"hidden",textOverflow:"ellipsis",marginBottom:4}}>{h.prompt?.slice(0,150)}...</div>
              <div style={{display:"flex",alignItems:"center",gap:8}}>
                {h.analyzed&&<span style={{fontSize:8,color:"#22c55e"}}>✅ analyzed</span>}
                {!h.analyzed&&<span style={{fontSize:8,color:"#8b5cf6"}}>⏳ pending</span>}
                {h.edits?.edited&&<span style={{fontSize:7,color:"#eab308",background:"#1a1800",padding:"1px 4px",borderRadius:2}}>edited</span>}
                <span onClick={()=>restoreEntry(h)} style={{fontSize:8,color:"#a78bfa",cursor:"pointer",marginLeft:"auto"}} title="Restore this prompt">↩</span>
                <span onClick={()=>hideEntry(h.id)} style={{fontSize:8,color:"#555",cursor:"pointer"}} title="Hide this entry">✕</span>
              </div>
            </div>
          ))}
        </div>
      )}

      <div style={{display:"flex",gap:5,marginBottom:10,flexWrap:"wrap"}}>
        {CATS.map(c=><button key={c} onClick={()=>setCat(c)} style={{background:cat===c?"#a78bfa":"#0e0e14",color:cat===c?"#000":"#777",border:`1px solid ${cat===c?"#a78bfa":"#1a1a28"}`,borderRadius:4,padding:"4px 10px",fontSize:10,fontWeight:cat===c?700:400,cursor:"pointer",fontFamily:"inherit"}}>{c}{c!=="All"&&<span style={{color:cat===c?"#333":"#555",fontSize:9}}> ({G.filter(g=>g.cat===c).length})</span>}</button>)}
      </div>

      <div style={{display:"grid",gridTemplateColumns:"280px 1fr",gap:14,height:"calc(100vh - 100px)"}}>
        <div style={{display:"flex",flexDirection:"column",gap:6,overflow:"hidden"}}>
          <input placeholder="Search genres / moods..." value={search} onChange={e=>setSearch(e.target.value)} style={iS}/>
          <div style={{flex:1,overflowY:"auto",display:"flex",flexDirection:"column",gap:2}}>
            {filtered.map(g=>{const isSel=sel.find(s=>s.s===g.s);const ti=TIERS[g.ti]||TIERS[3];return(
              <div key={g.s} onClick={()=>toggle(g)} style={{background:isSel?"#13132a":"#0c0c12",border:`1px solid ${isSel?"#7c3aed":"#121220"}`,borderRadius:4,padding:"7px 9px",cursor:"pointer"}}>
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                  <div style={{display:"flex",alignItems:"center",gap:5}}>
                    <span style={{width:5,height:5,borderRadius:"50%",background:ti.c,flexShrink:0}}/>
                    <span style={{fontSize:10,fontWeight:isSel?600:400,color:isSel?"#a78bfa":"#c0c0c8"}}>{g.n}</span>
                    <span style={{fontSize:9,color:"#3a3a44"}}>{g.k}</span>
                  </div>
                  <span style={{fontSize:8,color:"#3a3a44"}}>{g.bL}–{g.bH}</span>
                </div>
                <div style={{display:"flex",gap:3,marginTop:3,flexWrap:"wrap"}}>
                  {g.em.slice(0,3).map((e,i)=><span key={i} style={{fontSize:7,color:"#555",background:"#0a0a10",padding:"1px 4px",borderRadius:2}}>{e}</span>)}
                </div>
              </div>
            );})}
          </div>
        </div>

        <div style={{display:"flex",flexDirection:"column",gap:10,overflowY:"auto"}}>
          {/* Selected */}
          <div style={{background:"#0c0c12",borderRadius:6,padding:12,border:"1px solid #151520"}}>
            <div style={{fontSize:9,color:"#444",marginBottom:6,textTransform:"uppercase",letterSpacing:1}}>{sel.length===0?"Select 1-3 genres":sel.length>1?`Fusion Mode (${sel.length} genres)`:"Single Genre"}</div>
            {sel.length===0?<div style={{color:"#1a1a24",fontSize:11,padding:"14px 0",textAlign:"center"}}>← Click a genre</div>:
            <div>
              <div style={{display:"flex",gap:8}}>{sel.map((g,i)=>{
                const accents=["#a78bfa","#f472b6","#34d399"];
                const labels=["PRIMARY","SECONDARY","TERTIARY"];
                const accent=accents[i]||"#888";
                const w=getWeights();
                return(
              <div key={g.s} style={{flex:1,background:"#08080d",borderRadius:5,padding:10,borderLeft:`3px solid ${accent}`}}>
                <div style={{display:"flex",justifyContent:"space-between",marginBottom:4}}>
                  <span style={{fontSize:12,fontWeight:700,color:accent}}>{g.n} <span style={{fontSize:9,color:"#444"}}>{g.k}</span></span>
                  <span style={{fontSize:8,color:"#444"}}>{sel.length>1?`${labels[i]} ${w[i]}%`:"100%"}</span>
                </div>
                <div style={{fontSize:8,color:"#555",marginBottom:4}}>BPM {g.bL}–{g.bH} · <span style={{color:(TIERS[g.ti]||{}).c}}>Tier {g.ti}</span></div>
                <div style={{fontSize:8,color:"#666"}}><span style={{color:"#888"}}>Identity:</span> {g.ei.join(" · ")}</div>
                <div style={{display:"flex",gap:2,marginTop:5,flexWrap:"wrap"}}>{g.pt.slice(0,5).map((t,j)=><span key={j} style={{fontSize:7,padding:"2px 4px",borderRadius:2,background:`rgba(167,139,250,${t.w*0.2})`,color:"#999"}}>{t.t}</span>)}</div>
                <button onClick={e=>{e.stopPropagation();setSel(p=>p.filter(x=>x.s!==g.s));setPerformance("");}} style={{marginTop:4,background:"transparent",border:"1px solid #1a1a28",borderRadius:3,padding:"2px 6px",color:"#444",fontSize:8,cursor:"pointer",fontFamily:"inherit"}}>Remove</button>
              </div>);})}
              </div>
              {sel.length>=2&&(
                <div style={{marginTop:8,background:"#08080d",borderRadius:5,padding:"8px 10px",border:"1px solid #1a1a24"}}>
                  <div style={{fontSize:8,color:"#555",textTransform:"uppercase",marginBottom:4}}>Fusion Weight</div>
                  {sel.length===2?(
                    <div style={{display:"flex",alignItems:"center",gap:8}}>
                      <span style={{fontSize:9,color:"#a78bfa",fontWeight:600,width:30,textAlign:"right"}}>{fusionWeights[0]}%</span>
                      <input type="range" min="50" max="90" step="5" value={fusionWeights[0]}
                        onChange={e=>{const v=parseInt(e.target.value);setFusionWeights([v,100-v]);}}
                        style={{flex:1,accentColor:"#a78bfa"}}/>
                      <span style={{fontSize:9,color:"#f472b6",fontWeight:600,width:30}}>{fusionWeights[1]}%</span>
                    </div>
                  ):(
                    <div style={{display:"flex",flexDirection:"column",gap:4}}>
                      <div style={{display:"flex",alignItems:"center",gap:6}}>
                        <span style={{fontSize:8,color:"#a78bfa",width:22}}>P</span>
                        <input type="range" min="30" max="80" step="5" value={fusionWeights[0]}
                          onChange={e=>{const v=parseInt(e.target.value);const remain=100-v;const s2=Math.round(remain*0.6);setFusionWeights([v,s2,remain-s2]);}}
                          style={{flex:1,accentColor:"#a78bfa"}}/>
                        <span style={{fontSize:9,color:"#a78bfa",fontWeight:600,width:28,textAlign:"right"}}>{fusionWeights[0]}%</span>
                      </div>
                      <div style={{display:"flex",alignItems:"center",gap:6}}>
                        <span style={{fontSize:8,color:"#f472b6",width:22}}>S</span>
                        <input type="range" min="10" max="50" step="5" value={fusionWeights[1]}
                          onChange={e=>{const v=parseInt(e.target.value);const remain=100-fusionWeights[0];const clamped=Math.min(v,remain-5);setFusionWeights([fusionWeights[0],clamped,remain-clamped]);}}
                          style={{flex:1,accentColor:"#f472b6"}}/>
                        <span style={{fontSize:9,color:"#f472b6",fontWeight:600,width:28,textAlign:"right"}}>{fusionWeights[1]}%</span>
                      </div>
                      <div style={{display:"flex",alignItems:"center",gap:6}}>
                        <span style={{fontSize:8,color:"#34d399",width:22}}>T</span>
                        <div style={{flex:1,height:4,background:"#1a1a28",borderRadius:2}}>
                          <div style={{width:`${fusionWeights[2]}%`,height:"100%",background:"#34d399",borderRadius:2}}/>
                        </div>
                        <span style={{fontSize:9,color:"#34d399",fontWeight:600,width:28,textAlign:"right"}}>{fusionWeights[2]}%</span>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>}
          </div>

          {/* Controls */}
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr 1fr auto",gap:8,alignItems:"end"}}>
            <div><label style={{fontSize:8,color:"#444",display:"block",marginBottom:2,textTransform:"uppercase"}}>Mode</label>
              <select value={mode} onChange={e=>setMode(e.target.value)} style={iS}><option value="full">Full (1000) + AI</option><option value="compact">Compact (200)</option></select></div>
            <div><label style={{fontSize:8,color:"#444",display:"block",marginBottom:2,textTransform:"uppercase"}}>BPM Override</label>
              <input value={bpm} onChange={e=>setBpm(e.target.value)} placeholder="auto" style={iS}/></div>
            <div><label style={{fontSize:8,color:"#444",display:"block",marginBottom:2,textTransform:"uppercase"}}>Mood Override</label>
              <input value={mood} onChange={e=>setMood(e.target.value)} placeholder="e.g. dark, tense" style={iS}/></div>
            <div><label style={{fontSize:8,color:instrumental?"#333":"#444",display:"block",marginBottom:2,textTransform:"uppercase"}}>{instrumental?"Vocal (disabled)":"Vocal Direction"}</label>
              <input value={instrumental?"":vocal} onChange={e=>setVocal(e.target.value)} placeholder={instrumental?"instrumental mode":"e.g. female breathy"} disabled={instrumental} style={{...iS,opacity:instrumental?0.3:1}}/></div>
            <div style={{paddingBottom:1}}>
              <label onClick={()=>{setInstrumental(!instrumental);if(!instrumental)setVocal("");setPerformance("");}} style={{display:"flex",alignItems:"center",gap:6,cursor:"pointer",padding:"6px 12px",background:instrumental?"#1a0a2e":"#0e0e14",border:`1px solid ${instrumental?"#7c3aed":"#1a1a28"}`,borderRadius:4,userSelect:"none",transition:"all 0.15s"}}>
                <span style={{width:14,height:14,borderRadius:3,border:`2px solid ${instrumental?"#a78bfa":"#333"}`,background:instrumental?"#a78bfa":"transparent",display:"flex",alignItems:"center",justifyContent:"center",fontSize:10,color:"#000",fontWeight:700,transition:"all 0.15s"}}>{instrumental?"✓":""}</span>
                <span style={{fontSize:9,color:instrumental?"#a78bfa":"#666",fontWeight:instrumental?600:400}}>INST</span>
              </label>
            </div>
          </div>

          {mode==="compact"&&<div><label style={{fontSize:8,color:"#444",textTransform:"uppercase"}}>Min Weight: {threshold}</label><input type="range" min="0.3" max="0.9" step="0.05" value={threshold} onChange={e=>setThreshold(parseFloat(e.target.value))} style={{width:"100%",accentColor:"#a78bfa"}}/></div>}

          {mode==="full"&&sel.length>0&&(
            <div style={{display:"grid",gridTemplateColumns:"1fr 100px auto",gap:10,alignItems:"end"}}>
              <div><label style={{fontSize:8,color:"#444",display:"block",marginBottom:2,textTransform:"uppercase"}}>Additional Direction for AI (optional)</label><input value={extra} onChange={e=>setExtra(e.target.value)} placeholder="e.g. 20-second hook-focused, SNS short-form, cinematic build..." style={iS}/></div>
              <div>
                <label style={{fontSize:8,color:"#444",display:"block",marginBottom:2,textTransform:"uppercase"}}>Model</label>
                {useBYOK?(
                  <select value={aiModel} onChange={e=>setAiModel(e.target.value)} style={iS}>
                    {availModels.length>0?availModels.map(m=><option key={m.id} value={m.id}>{PROVIDERS[m.provider].label}: {m.n}</option>):<option value="">Add key in ⚙</option>}
                  </select>
                ):(
                  <div style={{...iS,color:"#22c55e"}}>Sonnet 4.6</div>
                )}
              </div>
              <div style={{width:120}}>
                <label style={{fontSize:8,color:"#444",display:"block",marginBottom:2,textTransform:"uppercase"}}>Randomize: {randomize <= 0.2 ? "Fixed" : randomize <= 0.5 ? "Low" : randomize <= 0.8 ? "Mid" : "High"}</label>
                <input type="range" min="0" max="1" step="0.1" value={randomize} onChange={e=>setRandomize(parseFloat(e.target.value))} style={{width:"100%",accentColor:"#a78bfa"}}/>
              </div>
            </div>
          )}

          {/* Full Mode Output */}
          {sel.length>0&&mode==="full"&&(
            <div style={{background:"#0c0c12",borderRadius:6,padding:14,border:"1px solid #151520"}}>
              <div style={{fontSize:9,color:"#555",textTransform:"uppercase",letterSpacing:1,marginBottom:6}}>Foundation (auto from DB)</div>
              <div style={{background:"#08080d",borderRadius:4,padding:10,fontSize:10,lineHeight:1.6,color:"#a0a0b0",border:"1px solid #1a1a24"}}>{foundation}</div>
              
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:6,marginTop:10}}>
                <span style={{fontSize:9,color:"#555",textTransform:"uppercase",letterSpacing:1}}>Performance (AI-generated)</span>
                <button onClick={generatePerformance} disabled={loading} style={{background:loading?"#333":"#a78bfa",color:loading?"#888":"#000",border:"none",borderRadius:4,padding:"6px 16px",fontSize:10,fontWeight:700,cursor:loading?"default":"pointer",fontFamily:"inherit"}}>{loading?"Generating...":"Generate with AI"}</button>
              </div>

              {pendingUpload&&!analysisResult&&(
                <div style={{background:"#0d0a1a",border:"1px solid #2a1a4a",borderRadius:5,padding:"8px 12px",marginBottom:8}}>
                  <div style={{fontSize:9,color:"#8b5cf6",fontWeight:600}}>🎵 Upload your Suno mp3 → get analysis report + 1 bonus generate!</div>
                </div>
              )}

              <div style={{background:"#08080d",borderRadius:4,padding:10,fontSize:10,lineHeight:1.6,color:performance?"#c8c8d8":"#333",border:"1px solid #1a1a24",minHeight:40}}>{performance||"Click 'Generate with AI'..."}</div>

              {(foundation||performance)&&(
                <div style={{marginTop:10}}>
                  <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:6}}>
                    <span style={{fontSize:9,color:"#555",textTransform:"uppercase"}}>Combined Prompt {editMode&&<span style={{color:"#eab308",fontSize:8,marginLeft:4}}>● editing</span>}</span>
                    <div style={{display:"flex",gap:6,alignItems:"center"}}>
                      <span style={{fontSize:9,color:(editMode?combinedEdit:fullPrompt).length>1000?"#ef4444":"#22c55e"}}>{(editMode?combinedEdit:fullPrompt).length}/1000</span>
                      {!editMode&&performance&&<button onClick={()=>{setEditMode(true);setCombinedEdit(fullPrompt);if(history.length>0&&!history[0].analyzed){const u=[{...history[0],edits:{...history[0].edits,original:fullPrompt}},...history.slice(1)];saveHistory(u);if(history[0].sbId)sbUpdate('style_history',`id=eq.${history[0].sbId}`,{edit_original:fullPrompt});}}} style={{background:"transparent",border:"1px solid #eab308",borderRadius:4,padding:"4px 10px",fontSize:9,fontWeight:600,cursor:"pointer",fontFamily:"inherit",color:"#eab308"}}>✎ Edit</button>}
                      {editMode&&<button onClick={()=>{if(history.length>0&&!history[0].analyzed&&history[0].sbId){sbUpdate('style_history',`id=eq.${history[0].sbId}`,{edit_final:fullPrompt,edited:false,prompt:fullPrompt});}const u=[{...history[0],prompt:fullPrompt,edits:{...history[0].edits,final:fullPrompt,edited:false}},...history.slice(1)];saveHistory(u);setEditMode(false);setCombinedEdit("");}} style={{background:"transparent",border:"1px solid #1a1a28",borderRadius:3,padding:"2px 6px",color:"#555",fontSize:8,cursor:"pointer",fontFamily:"inherit"}}>Reset</button>}
                      <button onClick={()=>copy(editMode?combinedEdit:fullPrompt,"full")} style={{background:copied==="full"?"#22c55e":"#a78bfa",color:"#000",border:"none",borderRadius:4,padding:"4px 12px",fontSize:9,fontWeight:700,cursor:"pointer",fontFamily:"inherit"}}>{copied==="full"?"COPIED!":"COPY"}</button>
                    </div>
                  </div>
                  {editMode?(
                    <textarea value={combinedEdit} onChange={e=>{const v=e.target.value;setCombinedEdit(v);if(history.length>0&&!history[0].analyzed){const u=[{...history[0],prompt:v,edits:{...history[0].edits,final:v,edited:true}},...history.slice(1)];saveHistory(u);if(history[0].sbId)sbUpdate('style_history',`id=eq.${history[0].sbId}`,{edit_final:v,edited:true,prompt:v});}}} rows={5} style={{...iS,minHeight:100,resize:"vertical",lineHeight:1.7,color:"#d0d0dc"}}/>
                  ):(
                    <div style={{background:"#08080d",borderRadius:4,padding:10,fontSize:10,lineHeight:1.7,color:"#d0d0dc",border:"1px solid #1a1a24",whiteSpace:"pre-wrap",wordBreak:"break-word",maxHeight:200,overflowY:"auto"}}>{fullPrompt}</div>
                  )}
                </div>
              )}

              {negPrompt.length>0&&(
                <div style={{marginTop:8}}>
                  <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                    <span style={{fontSize:8,color:"#444",textTransform:"uppercase"}}>Negative (optional)</span>
                    <button onClick={()=>copy(negPrompt.join(", "),"neg")} style={{background:"transparent",border:"1px solid #2a1a1a",borderRadius:3,padding:"2px 6px",color:"#f87171",fontSize:8,cursor:"pointer",fontFamily:"inherit"}}>{copied==="neg"?"Copied":"Copy"}</button>
                  </div>
                  <div style={{background:"#0d0808",borderRadius:4,padding:6,fontSize:9,color:"#f87171",border:"1px solid #1a1010",marginTop:3}}>{negPrompt.join(", ")}</div>
                </div>
              )}
            </div>
          )}

          {/* Compact Mode Output */}
          {sel.length>0&&mode==="compact"&&(
            <div style={{background:"#0c0c12",borderRadius:6,padding:14,border:"1px solid #151520"}}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:8}}>
                <span style={{fontSize:9,color:"#555",textTransform:"uppercase"}}>Compact (200 char)</span>
                <div style={{display:"flex",gap:6,alignItems:"center"}}>
                  <span style={{fontSize:9,color:compactPrompt.length>200?"#ef4444":"#22c55e"}}>{compactPrompt.length}/200</span>
                  <button onClick={()=>copy(compactPrompt,"c")} style={{background:copied==="c"?"#22c55e":"#a78bfa",color:"#000",border:"none",borderRadius:4,padding:"4px 12px",fontSize:9,fontWeight:700,cursor:"pointer",fontFamily:"inherit"}}>{copied==="c"?"COPIED!":"COPY"}</button>
                </div>
              </div>
              <div style={{background:"#08080d",borderRadius:4,padding:10,fontSize:10,lineHeight:1.6,color:"#d0d0dc",border:"1px solid #1a1a24"}}>{compactPrompt}</div>
              {negPrompt.length>0&&<div style={{marginTop:6,fontSize:8,color:"#f87171"}}>Exclude: {negPrompt.join(", ")}</div>}
            </div>
          )}

          <div style={{fontSize:8,color:"#222",lineHeight:1.5}}>Full: Foundation (DB) + Performance (Claude AI, editable). Compact: weight-sorted tags. 1-2 genres max.</div>

          {/* Audio Analysis */}
          {history.length>0&&(
            <div style={{background:"#0a0a14",borderRadius:6,padding:14,border:"1px solid #1a1a2e",marginTop:10}}>
              <div style={{fontSize:9,color:"#8b5cf6",textTransform:"uppercase",fontWeight:700,marginBottom:8}}>🎵 Suno Result Analysis</div>
              <div style={{fontSize:9,color:"#555",marginBottom:4}}>Upload your Suno mp3 → get analysis report + 1 bonus generate!</div>
              <div style={{marginBottom:8}}>
                <div style={{fontSize:8,color:"#444",marginBottom:3}}>Which prompt was this mp3 generated from?</div>
                <select value={selectedHistoryId||history[0]?.id||""} onChange={e=>{setSelectedHistoryId(Number(e.target.value));setAnalysisResult(null);}} style={{width:"100%",background:"#08080d",color:"#aaa",border:"1px solid #1a1a24",borderRadius:4,padding:"6px 8px",fontSize:9,fontFamily:"inherit"}}>
                  {history.map(h=>(
                    <option key={h.id} value={h.id}>{h.genres?.join(" × ")} · {h.edits?.edited?"✎ ":""}{h.prompt?.slice(0,60)}... · {new Date(h.ts).toLocaleString()}{h.analyzed?" ✅":""}</option>
                  ))}
                </select>
              </div>
              <div style={{display:"flex",gap:8,alignItems:"center"}}>
                <input type="file" accept="audio/*" onChange={e=>setAnalysisFile(e.target.files?.[0]||null)} style={{fontSize:9,color:"#888",flex:1}}/>
                <button onClick={analyzeAudio} disabled={!analysisFile||analyzing} style={{background:analysisFile&&!analyzing?"#8b5cf6":"#333",color:"#fff",border:"none",borderRadius:4,padding:"6px 14px",fontSize:9,fontWeight:700,cursor:analysisFile&&!analyzing?"pointer":"not-allowed",fontFamily:"inherit",opacity:analysisFile&&!analyzing?1:0.5}}>
                  {analyzing?"Analyzing...":"Analyze"}
                </button>
              </div>
              {analysisResult&&!analysisResult.error&&(
                <div style={{marginTop:10}}>
                  <div style={{display:"flex",gap:6,flexWrap:"wrap",marginBottom:8}}>
                    {[["Genre",analysisResult.evaluation?.genre_accuracy],["BPM",analysisResult.evaluation?.bpm_accuracy],["Instruments",analysisResult.evaluation?.instrument_accuracy],["Mood",analysisResult.evaluation?.mood_accuracy],["Structure",analysisResult.evaluation?.structure_accuracy]].map(([label,score])=>(
                      <div key={label} style={{background:"#111",borderRadius:4,padding:"4px 8px",fontSize:9,textAlign:"center",border:`1px solid ${score>=7?"#22c55e":score>=4?"#eab308":"#ef4444"}22`}}>
                        <div style={{color:"#666",fontSize:7}}>{label}</div>
                        <div style={{color:score>=7?"#22c55e":score>=4?"#eab308":"#ef4444",fontWeight:700}}>{score}/10</div>
                      </div>
                    ))}
                    <div style={{background:"#111",borderRadius:4,padding:"4px 10px",fontSize:9,textAlign:"center",border:"1px solid #8b5cf622"}}>
                      <div style={{color:"#666",fontSize:7}}>Overall</div>
                      <div style={{color:"#8b5cf6",fontWeight:700,fontSize:12}}>{analysisResult.evaluation?.overall_score}</div>
                    </div>
                  </div>
                  <div style={{fontSize:9,color:"#aaa",lineHeight:1.6,background:"#08080d",borderRadius:4,padding:8,border:"1px solid #1a1a24"}}>{analysisResult.evaluation?.summary}</div>
                  {analysisResult.evaluation?.token_feedback&&(
                    <div style={{marginTop:6}}>
                      <div style={{fontSize:8,color:"#555",marginBottom:4}}>Token Effectiveness:</div>
                      <div style={{display:"flex",gap:4,flexWrap:"wrap"}}>
                        {analysisResult.evaluation.token_feedback.map((t,i)=>(
                          <span key={i} title={t.reason} style={{fontSize:8,padding:"2px 6px",borderRadius:3,cursor:"help",background:t.effectiveness==="high"?"#22c55e22":t.effectiveness==="medium"?"#eab30822":"#ef444422",color:t.effectiveness==="high"?"#22c55e":t.effectiveness==="medium"?"#eab308":"#ef4444",border:`1px solid ${t.effectiveness==="high"?"#22c55e":t.effectiveness==="medium"?"#eab308":"#ef4444"}33`}}>{t.token}</span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
              {analysisResult?.error&&<div style={{color:"#ef4444",fontSize:9,marginTop:6}}>{analysisResult.error}</div>}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
