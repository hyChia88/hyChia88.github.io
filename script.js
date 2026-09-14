// Native links and disclosures work without JavaScript.
// Move keyboard focus to an in-page destination after anchor navigation.
document.addEventListener('click', (event) => {
  if (!(event.target instanceof Element)) return;
  const link = event.target.closest('a[href^="#"]');
  if (!link || event.defaultPrevented || event.button !== 0 ||
      event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
  const id = link.getAttribute('href').slice(1);
  const target = document.getElementById(id);
  if (!target) return;
  const hadTabIndex = target.hasAttribute('tabindex');
  if (!hadTabIndex) target.setAttribute('tabindex', '-1');
  target.focus({ preventScroll: true });
  if (!hadTabIndex) {
    target.addEventListener('blur', () => target.removeAttribute('tabindex'), { once: true });
  }
});

// A small, dependency-free WebGL scene. Project links remain available without it.
(() => {
  const canvas = document.getElementById('house-canvas');
  if (!canvas) return;

  const stage = document.getElementById('work');
  const labels = document.getElementById('scene-labels');
  const controls = document.getElementById('scene-controls');
  const zoomControls = document.getElementById('scene-zoom');
  const hint = document.getElementById('scene-hint');
  const fallback = document.getElementById('scene-fallback');
  const dialog = document.getElementById('project-dialog');
  const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const categoryControls = document.getElementById('scene-categories');
  // Project content belongs to the interactive house.
  const projects = {
  "three": {
    "title": "3Ts - 3D Architecture Model Generation",
    "label": "3Ts",
    "category": "software",
    "categoryTitle": "Software Engineering, AI/ML Practice...",
    "description": "Vision Transformer-Based Sketch-to-3D Pipeline | AI in 3D, Collab work with Graham, Karthick, David",
    "image": "assets/img/3ts-architecture.png",
    "alt": "3Ts 3D Architecture Model Generation Project",
    "links": [
      {
        "href": "https://github.com/1gfelton/3T3D.git",
        "label": "GitHub ↗"
      },
      {
        "href": "assets/pdfs/3Ts.pdf",
        "label": "Project PDF ↗"
      }
    ],
    "object": "three",
    "anchor": [
      -3.95,
      1.72,
      -2.15
    ],
    "yaw": 0.67
  },
  "uninest": {
    "title": "UniNest",
    "label": "UniNest",
    "category": "software",
    "categoryTitle": "Software Engineering, AI/ML Practice...",
    "description": "Full stack web application, AI-Powered Housing Search Engine | Carnegie Mellon University",
    "image": "assets/img/uninest-1.png",
    "alt": "UniNest – AI-Powered Housing Search Engine",
    "links": [
      {
        "href": "https://github.com/uninest-ai/uninest.git",
        "label": "GitHub ↗"
      }
    ],
    "object": "uninest",
    "anchor": [
      -3.65,
      1.12,
      -0.55
    ],
    "yaw": 0.9
  },
  "lennar": {
    "title": "Internship at Lennar",
    "label": "Lennar",
    "category": "software",
    "categoryTitle": "Software Engineering, AI/ML Practice...",
    "description": "AI-Powered Image Search Engine and Conversation Text Analysis | Lennar Corp.",
    "image": "assets/img/lennar.png",
    "alt": "My Internship at Lennar",
    "links": [
      {
        "href": "lennar_internship.html",
        "label": "Explore project ↗"
      }
    ],
    "object": "lennar",
    "anchor": [
      -2.45,
      1.82,
      -2.1
    ],
    "yaw": 0.3
  },
  "aec": {
    "title": "AEC Interpreter: Multimodal BIM Element Retrieval [In progress]",
    "label": "AEC Interpreter",
    "category": "software",
    "categoryTitle": "Software Engineering, AI/ML Practice...",
    "description": "Bridging the \"Semantic Gap\" between Messy Site Data and Structured BIM",
    "image": "assets/gif/mscd_demo.gif",
    "alt": "AI for AEC, AI Interpreter",
    "links": [
      {
        "href": "https://hychia88.github.io/aec-interpreter/",
        "label": "Explore project ↗"
      }
    ],
    "object": "aec",
    "anchor": [
      -1.3,
      1.52,
      -0.65
    ],
    "yaw": 0.55
  },
  "cad": {
    "title": "CAD-MLLM reprod + autocompletion",
    "label": "CAD-MLLM",
    "category": "software",
    "categoryTitle": "Software Engineering, AI/ML Practice...",
    "description": "CAD-MLLM, (Multimodal Large Language Model) Collab work with Ethan Di, Karthick, David Chen",
    "image": "assets/img/cad_mllm.png",
    "alt": "CAD-MLLM Architecture Project",
    "links": [
      {
        "href": "https://github.com/veoery/CMU16825_Final_project.git",
        "label": "GitHub ↗"
      },
      {
        "href": "assets/pdfs/cad_mllm.pdf",
        "label": "Project PDF ↗"
      }
    ],
    "object": "cad",
    "anchor": [
      -1.0,
      1.46,
      -2.05
    ],
    "yaw": 0.4
  },
  "motion": {
    "title": "Build by Motion",
    "label": "Build by Motion",
    "category": "computational",
    "categoryTitle": "Computational Design & 3D Exploration...",
    "description": "A gesture-driven pattern tool with real-time 3D-to-2D projection and Catmull-Clark subdivision for smooth geometry. Built a custom 2D front-end framework for interactive design.",
    "image": "assets/gif/buildbymotion.gif",
    "alt": "Build by Motion",
    "links": [
      {
        "href": "https://github.com/hyChia88/Build-By-Motion.git",
        "label": "Source code ↗"
      }
    ],
    "object": "motion",
    "anchor": [
      1.65,
      1.85,
      -1.15
    ],
    "yaw": 0.3
  },
  "sense": {
    "title": "Sense Bridge",
    "label": "Sense Bridge",
    "category": "computational",
    "categoryTitle": "Computational Design & 3D Exploration...",
    "description": "A motion-aware interaction system designed to enhance hybrid communication. Integrates real-time motion sensing to create intuitive, expressive digital interactions.",
    "image": "assets/gif/sensebridge.gif",
    "alt": "Sense Bridge Project",
    "links": [
      {
        "href": "https://github.com/hyChia88/SenseBridge",
        "label": "Source code ↗"
      }
    ],
    "object": "sense",
    "anchor": [
      3.65,
      1.85,
      -1.9
    ],
    "yaw": 0.1
  },
  "panelling": {
    "title": "Internship Works: Panelling",
    "label": "Panelling",
    "category": "fabrication",
    "categoryTitle": "Digital Fabrication Practice...",
    "description": "parametric design, panelling, details",
    "image": "assets/img/mad.jpg",
    "alt": "MAD",
    "links": [
      {
        "href": "assets/pdfs/MAD_Paneling.pdf",
        "label": "Project PDF ↗"
      }
    ],
    "object": "panelling",
    "anchor": [
      -1.15,
      1.75,
      1.5
    ],
    "yaw": 0.67
  },
  "weaving": {
    "title": "Weaving Structure Installation",
    "label": "Weaving Structure",
    "category": "fabrication",
    "categoryTitle": "Digital Fabrication Practice...",
    "description": "An automated labeling system for round and rectangular rods (3mm–20mm) to streamline construction processes. The system generates custom codes and places them at precise distances defined by CSV input.",
    "image": "assets/gif/weaving.gif",
    "alt": "Weaving Structure Installation",
    "links": [
      {
        "href": "https://github.com/hyChia88/Weaving-Structure-Installation-Optimization-and-Automation",
        "label": "Source code ↗"
      }
    ],
    "object": "weaving",
    "anchor": [
      1.1,
      1.7,
      1.5
    ],
    "yaw": 1.1
  },
  "droplet": {
    "title": "Droplet: Digital Fabrication",
    "label": "Droplet",
    "category": "fabrication",
    "categoryTitle": "Digital Fabrication Practice...",
    "description": "Digital Fabrication, Structure design, Artificial fog system design",
    "image": "assets/img/droplet.jpg",
    "alt": "Droplet",
    "links": [
      {
        "href": "assets/pdfs/Droplet.pdf",
        "label": "Project PDF ↗"
      }
    ],
    "object": "droplet",
    "anchor": [
      -1.15,
      1.26,
      3.0
    ],
    "yaw": 0.8
  },
  "joinery": {
    "title": "Details & Joinery: 3D Printing Traditional Joints",
    "label": "Details & Joinery",
    "category": "fabrication",
    "categoryTitle": "Digital Fabrication Practice...",
    "description": "Digital fabrication, Typology Research, 3D printing, Parametric design",
    "image": "assets/img/3d%20printing.jpg",
    "alt": "3D printing Project",
    "links": [
      {
        "href": "assets/pdfs/3d%20printing.pdf",
        "label": "Project PDF ↗"
      }
    ],
    "object": "joinery",
    "anchor": [
      1.1,
      1.24,
      3.0
    ],
    "yaw": 0.5
  }
};
  const fallbackProjects = document.createElement('div');
  fallbackProjects.className = 'fallback-projects';
  for (const project of Object.values(projects)) {
    const link = document.createElement('a');
    link.href = project.links[0].href;
    link.textContent = project.title + ' ↗';
    fallbackProjects.append(link);
  }
  fallback.append(fallbackProjects);
  let activeCategory = null;
  const backToHouse = document.getElementById('back-to-house');
  const zoneLabels = document.getElementById('zone-labels');
  const roomCaption = document.getElementById('room-caption');
  const rooms = {
    software: { title:'Software & AI gallery', detail:'Level 1 · Software & AI gallery', x:-2.45, y:2.60, level:1.85, z:-1.5, yaw:.38, pitch:.56, zoom:1.8 },
    computational: { title:'Computational design gallery', detail:'Level 2 · Computational design gallery', x:2.45, y:4.45, level:3.7, z:-1.5, yaw:-.3, pitch:.5, zoom:1.85 },
    fabrication: { title:'Fabrication market', detail:'Ground floor · Fabrication market', x:0, y:.75, level:0, z:3.0, yaw:.42, pitch:.6, zoom:1.8 }
  };
  for (const project of Object.values(projects)) {
    project.anchor[1] += rooms[project.category].level;
    if (project.category === 'fabrication') project.anchor[2] += .9;
  }
  const categoryColors = { software: 'blue', computational: 'violet', fabrication: 'orange' };
  for (const [id,project] of Object.entries(projects)) {
    const button = document.createElement('button');
    button.className = 'scene-label';
    button.type = 'button';
    button.dataset.project = id;
    button.setAttribute('aria-haspopup','dialog');
    button.setAttribute('aria-label',project.title);
    const dot = document.createElement('span');
    dot.className = `label-dot ${categoryColors[project.category]}`;
    const name = document.createElement('span');
    name.textContent = project.label;
    const arrow = document.createElement('span');
    arrow.className = 'label-arrow';
    arrow.textContent = '↗';
    arrow.setAttribute('aria-hidden','true');
    button.append(dot,name,arrow);
    button.hidden = project.category !== activeCategory;
    labels.append(button);
  }
  function setCategory(category) {
    activeCategory = category;
    for (const button of categoryControls.querySelectorAll('button')) {
      button.setAttribute('aria-pressed',String(button.dataset.category === category));
    }
    for (const button of labels.querySelectorAll('button')) {
      button.hidden = projects[button.dataset.project].category !== category;
    }
    zoneLabels.hidden = Boolean(category);
    categoryControls.hidden = !category;
    backToHouse.hidden = !category;
    roomCaption.textContent = category ? rooms[category].detail : 'The Forest · A tropical museum.';
    document.getElementById('scene-instruction').textContent = category ? 'Click empty space to return' : 'Select a gallery or project';
    stage.dataset.room = category || 'house';
    canvas.setAttribute('aria-label',category ? `${rooms[category].title}. Drag to rotate; select a labeled project to explore.` : 'The Forest: a tropical museum with three project galleries. Select Software and AI, Computational Design, or Fabrication to look inside.');
    renderer?.changeCategory();
  }
  function projectForObject(object) {
    return Object.keys(projects).find(id => projects[id].category === activeCategory && projects[id].object === object) || null;
  }

  let renderer;
  let selected = null;
  let returnFocus = null;
  let beforeProjectView = null;
  function openProject(id, opener) {
    const project = projects[id];
    if (!project || dialog.open) return;
    if (activeCategory !== project.category) setCategory(project.category);
    selected = id;
    returnFocus = opener;
    document.getElementById('dialog-title').textContent = project.title;
    document.getElementById('dialog-category').textContent = project.categoryTitle;
    document.getElementById('dialog-description').textContent = project.description;
    const image = document.getElementById('dialog-image');
    image.src = project.image;
    image.alt = project.alt;
    document.getElementById('dialog-actions').replaceChildren(...project.links.map(link => {
      const action = document.createElement('a');
      action.href = link.href;
      action.textContent = link.label;
      action.className = 'button';
      return action;
    }));
    if (renderer) beforeProjectView = renderer.focus(id);
    dialog.showModal();
    document.getElementById('dialog-close').focus({ preventScroll: true });
  }
  for (const button of labels.querySelectorAll('button')) {
    button.addEventListener('click', () => openProject(button.dataset.project, button));
    button.addEventListener('pointerenter', () => renderer?.highlight(button.dataset.project));
    button.addEventListener('pointerleave', () => renderer?.highlight(null));
    button.addEventListener('focus', () => renderer?.highlight(button.dataset.project));
    button.addEventListener('blur', () => renderer?.highlight(null));
  }
  for (const button of categoryControls.querySelectorAll('button')) {
    button.addEventListener('click', () => setCategory(button.dataset.category));
  }
  function returnToHouse() {
    const previous=activeCategory;
    setCategory(null);
    zoneLabels.querySelector(`[data-room="${previous}"]`)?.focus({preventScroll:true});
  }
  backToHouse.addEventListener('click', returnToHouse);
  for (const button of zoneLabels.querySelectorAll('button')) {
    button.addEventListener('click', () => setCategory(button.dataset.room));
  }
  document.getElementById('dialog-close').addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', event => {
    if (event.target !== dialog) return;
    const bounds = dialog.getBoundingClientRect();
    if (event.clientX < bounds.left || event.clientX > bounds.right ||
        event.clientY < bounds.top || event.clientY > bounds.bottom) dialog.close();
  });
  dialog.addEventListener('close', () => {
    selected = null;
    renderer?.restore(beforeProjectView);
    returnFocus?.focus({ preventScroll: true });
  });

  function createScene() {
    const gl = canvas.getContext('webgl', { antialias: true, alpha: true, premultipliedAlpha: false });
    if (!gl) throw new Error('WebGL is unavailable. The project list is still available.');
    const vertexSource = `
      attribute vec3 position;
      attribute vec3 normal;
      uniform vec3 objectPosition;
      uniform vec3 objectSize;
      uniform mat3 orientation;
      uniform vec3 cameraRight;
      uniform vec3 cameraUp;
      uniform vec3 cameraEye;
      uniform vec3 cameraTarget;
      uniform vec2 span;
      uniform vec2 screenOffset;
      varying vec3 surfaceNormal;
      varying vec3 worldPosition;
      void main() {
        worldPosition = orientation * (position * objectSize) + objectPosition;
        vec3 relative = worldPosition - cameraTarget;
        gl_Position = vec4(dot(relative, cameraRight) / span.x + screenOffset.x,
          dot(relative, cameraUp) / span.y + screenOffset.y, -dot(relative, cameraEye) / 30.0, 1.0);
        surfaceNormal = orientation * normalize(normal / objectSize);
      }`;
    const fragmentSource = `
      precision mediump float;
      uniform vec3 color;
      uniform float opacity;
      uniform float perforation;
      varying vec3 surfaceNormal;
      varying vec3 worldPosition;
      float ventDistance(vec2 uv, vec2 center) {
        vec2 q = uv - center;
        return abs(q.x / 0.18) + abs((q.y - q.x * 0.32) / 0.08);
      }
      void main() {
        // Eight-point geometric openings are cut through the lower shading layer.
        if (perforation > 1.5) {
          vec2 uv = worldPosition.xz / vec2(11.6,12.2) + 0.5;
          float opening = min(min(ventDistance(uv,vec2(0.22,0.20)),ventDistance(uv,vec2(0.69,0.31))),
            min(ventDistance(uv,vec2(0.36,0.61)),ventDistance(uv,vec2(0.76,0.79))));
          if (opening < 1.0) discard;
        } else if (perforation > 0.5) {
          vec2 p = abs(fract(worldPosition.xz * 2.65) - 0.5);
          if (min(max(p.x,p.y),(p.x+p.y)*0.7071) < 0.215) discard;
        }
        vec3 n = normalize(surfaceNormal) * (gl_FrontFacing ? 1.0 : -1.0);
        float sun = max(dot(n, normalize(vec3(-3.0, 7.0, 5.0))), 0.0);
        float fill = max(dot(n, normalize(vec3(4.0, 2.0, -2.0))), 0.0);
        float shade = 0.68 + 0.30 * sun + 0.09 * fill;
        float contact = mix(0.94, 1.0, smoothstep(0.0, 0.6, worldPosition.y));
        vec3 tint = vec3(1.015, 1.015, 1.0);
        gl_FragColor = vec4(color * shade * contact * tint, opacity);
      }`;
    function shader(type, source) {
      const result = gl.createShader(type);
      gl.shaderSource(result, source);
      gl.compileShader(result);
      if (!gl.getShaderParameter(result, gl.COMPILE_STATUS)) throw new Error(gl.getShaderInfoLog(result));
      return result;
    }
    const program = gl.createProgram();
    gl.attachShader(program, shader(gl.VERTEX_SHADER, vertexSource));
    gl.attachShader(program, shader(gl.FRAGMENT_SHADER, fragmentSource));
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) throw new Error(gl.getProgramInfoLog(program));
    gl.useProgram(program);
    const uniforms = Object.fromEntries(['objectPosition', 'objectSize', 'cameraRight', 'cameraUp', 'cameraEye', 'cameraTarget', 'span', 'screenOffset', 'color', 'orientation', 'opacity', 'perforation'].map(name => [name, gl.getUniformLocation(program, name)]));
    const positions = gl.getAttribLocation(program, 'position');
    const normals = gl.getAttribLocation(program, 'normal');
    gl.enableVertexAttribArray(positions);
    gl.enableVertexAttribArray(normals);
    gl.enable(gl.DEPTH_TEST);
    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA,gl.ONE_MINUS_SRC_ALPHA);
    gl.clearColor(0, 0, 0, 0);

    function geometry(vertices) {
      const buffer = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
      gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
      return { buffer, count: vertices.length / 6, vertices };
    }
    const cubeData = [];
    const cubeFaces = [
      [[1,0,0], [[.5,-.5,-.5],[.5,.5,-.5],[.5,.5,.5],[.5,-.5,.5]]],
      [[-1,0,0], [[-.5,-.5,.5],[-.5,.5,.5],[-.5,.5,-.5],[-.5,-.5,-.5]]],
      [[0,1,0], [[-.5,.5,-.5],[-.5,.5,.5],[.5,.5,.5],[.5,.5,-.5]]],
      [[0,-1,0], [[-.5,-.5,.5],[-.5,-.5,-.5],[.5,-.5,-.5],[.5,-.5,.5]]],
      [[0,0,1], [[-.5,-.5,.5],[.5,-.5,.5],[.5,.5,.5],[-.5,.5,.5]]],
      [[0,0,-1], [[.5,-.5,-.5],[-.5,-.5,-.5],[-.5,.5,-.5],[.5,.5,-.5]]]
    ];
    for (const [normal, corners] of cubeFaces) {
      for (const index of [0,1,2,0,2,3]) cubeData.push(...corners[index], ...normal);
    }
    const cube = geometry(cubeData);
    const sphereData = [];
    function spherePoint(u, v) {
      return [Math.sin(v) * Math.cos(u), Math.cos(v), Math.sin(v) * Math.sin(u)];
    }
    for (let row = 0; row < 14; row++) {
      for (let column = 0; column < 24; column++) {
        const points = [[column,row],[column+1,row],[column+1,row+1],[column,row+1]]
          .map(([u,v]) => spherePoint(u / 24 * Math.PI * 2, v / 14 * Math.PI));
        for (const index of [0,1,2,0,2,3]) sphereData.push(...points[index].map(n => n * .5), ...points[index]);
      }
    }
    const sphere = geometry(sphereData);
    const cylinderData = [];
    for (let i = 0; i < 32; i++) {
      const a = i / 32 * Math.PI * 2, b = (i + 1) / 32 * Math.PI * 2;
      const ca = Math.cos(a), sa = Math.sin(a), cb = Math.cos(b), sb = Math.sin(b);
      const side = [[ca,-1,sa],[cb,-1,sb],[cb,1,sb],[ca,1,sa]];
      for (const j of [0,1,2,0,2,3]) cylinderData.push(...side[j].map(n => n * .5), side[j][0], 0, side[j][2]);
      for (const y of [-.5,.5]) {
        cylinderData.push(0,y,0, 0,Math.sign(y),0, ca*.5,y,sa*.5, 0,Math.sign(y),0, cb*.5,y,sb*.5, 0,Math.sign(y),0);
      }
    }
    const cylinder = geometry(cylinderData);
    const meshes = [];
    const palette = {
      ivory:'#f7f6f2', edge:'#e4e9e3', wall:'#fdfcf8', wood:'#b09579',
      orange:'#d1a495', peach:'#e2c8b8', teal:'#3e7672', blue:'#a1c4c0',
      coral:'#d0a79b', dark:'#2a413d', green:'#3d7061'
    };
    const identity = [1,0,0,0,1,0,0,0,1];
    let zone = 'house', offset = [0,0,0];
    function rgb(hex) { return [1,3,5].map(i => parseInt(hex.slice(i,i+2),16)/255); }
    function mesh(shape,position,size,color,group=null,options={}) {
      const item = { shape, position:position.map((n,i)=>n+offset[i]), size,
        color:rgb(palette[color] || color), group, zone, orientation:identity, opacity:1, ...options };
      const m=item.orientation;
      item.bounds=[0,1,2].map(i=>Math.abs(m[i])*size[0]+Math.abs(m[i+3])*size[1]+Math.abs(m[i+6])*size[2]);
      meshes.push(item); return item;
    }
    const box=(p,s,c,g,o)=>mesh(cube,p,s,c,g,o);
    const ball=(p,s,c,g,o)=>mesh(sphere,p,s,c,g,o);
    const tube=(p,s,c,g,o)=>mesh(cylinder,p,s,c,g,o);
    const normalized=v=>{ const length=Math.hypot(...v); return v.map(n=>n/length); };
    const cross=(a,b)=>[a[1]*b[2]-a[2]*b[1],a[2]*b[0]-a[0]*b[2],a[0]*b[1]-a[1]*b[0]];
    function beam(a,b,thickness,color,group,options={}) {
      const delta=b.map((n,i)=>n-a[i]);
      const along=normalized(delta), right=normalized(cross(along,Math.abs(along[1])>.9?[1,0,0]:[0,1,0]));
      const forward=cross(right,along);
      return box(a.map((n,i)=>(n+b[i])/2),[thickness,Math.hypot(...delta),thickness],color,group,
        {...options,orientation:[...right,...along,...forward]});
    }
    function workspace(name,x,z,color) {
      zone=name; offset=[x,rooms[name].level,z];
      box([0,-.04,0],[4.45,.16,3.3],color);
      box([0,.047,0],[4.27,.016,3.12],'#f8f8f5');
      for (let x=-1.6;x<2;x+=.8) box([x,.06,0],[.01,.01,3.1],'#e3e7e1');
      if(name !== 'fabrication') {
        // Keep a fragment of the ventilated gallery around the close-up workspace.
        for(let x=-2.1;x<=2.1;x+=.16) box([x,.43,-1.59],[.035,.76,.04],'#c1ad91');
        box([0,.83,-1.59],[4.3,.055,.065],'#b6a185');
      }
    }
    function table(x,z,w,d) {
      box([x,.78,z],[w,.14,d],'wood');
      box([x,.86,z],[w+.05,.025,d+.04],'#e0d2bc');
      for(const a of [-1,1]) for(const b of [-1,1]) box([x+a*(w/2-.14),.39,z+b*(d/2-.12)],[.09,.75,.09],'#45675e');
    }
    function screen(x,y,z,w,h,color,id) {
      box([x,y,z],[w,h,.085],'dark',id);
      box([x,y,z+.05],[w-.07,h-.07,.02],color,id);
      box([x,y-h/2-.12,z],[.045,.25,.045],'dark',id);
      box([x,y-h/2-.24,z],[w*.4,.025,.2],'dark',id);
    }
    function house(x,y,z,w,h,color,id) {
      box([x,y+h/2,z],[w,h,w*.75],color,id);
      box([x,y+h+.035,z],[w+.08,.07,w*.75+.08],'#f5eee1',id);
      box([x,y+h*.43,z+w*.38],[w*.22,h*.4,.02],'#fbf9f4',id);
      box([x-w*.25,y+h*.7,z+w*.38],[w*.17,h*.18,.02],'#407673',id);
    }
    // The Forest: an interpretive model of the supplied museum drawings.
    // A public ground plane, staggered galleries, tree columns, and a vented canopy.
    const canopyOptions = {roof:true, noPick:true};
    const roofColumns=6,roofRows=7;
    const roofHeights=Array.from({length:roofColumns+1},(_,i)=>
      Array.from({length:roofRows+1},(_,j)=>{
        const u=i/roofColumns,v=j/roofRows;
        const fold=i>0&&i<roofColumns&&j>0&&j<roofRows?((i+j)%2?-.16:.16):0;
        return 6.95+1.2*Math.sin(u*Math.PI)+.64*Math.sin(v*Math.PI*2+u*.8)-.38*v+fold;
      }));
    function canopyPoint(u,v,layer=0) {
      const i=Math.min(roofColumns-1,Math.floor(u*roofColumns));
      const j=Math.min(roofRows-1,Math.floor(v*roofRows));
      const a=u*roofColumns-i,b=v*roofRows-j;
      const h00=roofHeights[i][j],h10=roofHeights[i+1][j];
      const h11=roofHeights[i+1][j+1],h01=roofHeights[i][j+1];
      // Piecewise planar interpolation keeps columns and edges on the same triangular faces.
      const h=b<=a?h00*(1-a)+h10*(a-b)+h11*b:h00*(1-b)+h11*a+h01*(b-a);
      return [(u-.5)*11.6,h+layer,(v-.5)*12.2];
    }
    function triangle(vertices,a,b,c) {
      const normal=normalized(cross(b.map((n,i)=>n-a[i]),c.map((n,i)=>n-a[i])));
      if(normal[1]<0) { [b,c]=[c,b]; normal.forEach((n,i)=>normal[i]=-n); }
      for(const p of [a,b,c]) vertices.push(...p,...normal);
    }
    const roofPanels=[[],[],[]], roofScreen=[];
    for(let i=0;i<roofColumns;i++) for(let j=0;j<roofRows;j++) {
      const uv=[[i/roofColumns,j/roofRows],[(i+1)/roofColumns,j/roofRows],[(i+1)/roofColumns,(j+1)/roofRows],[i/roofColumns,(j+1)/roofRows]];
      for(const [face,indices] of [[0,[0,1,2]],[1,[0,2,3]]]) {
        const points=indices.map(k=>canopyPoint(...uv[k]));
        triangle(roofScreen,...points);
        triangle(roofPanels[(i+j+face)%3],...points.map(p=>[p[0],p[1]+.19,p[2]]));
      }
    }
    mesh(geometry(roofScreen),[0,0,0],[1,1,1],'#e9dfce',null,{...canopyOptions,perforation:1});
    roofPanels.forEach((vertices,i)=>mesh(geometry(vertices),[0,0,0],[1,1,1],['#d1c1a9','#d6c7b0','#ccbaa0'][i],null,{...canopyOptions,perforation:2}));
    // Visible top seams and deeper underside members share the same coarse triangle mesh.
    function roofEdge(a,b,boundary=false) {
      beam([a[0],a[1]+.22,a[2]],[b[0],b[1]+.22,b[2]],boundary?.055:.028,'#af9e87',null,canopyOptions);
      beam([a[0],a[1]-.1,a[2]],[b[0],b[1]-.1,b[2]],boundary?.14:.095,'#a99578',null,canopyOptions);
    }
    for(let i=0;i<=roofColumns;i++) for(let j=0;j<=roofRows;j++) {
      const a=canopyPoint(i/roofColumns,j/roofRows);
      ball([a[0],a[1]-.1,a[2]],[.16,.13,.16],'#918773',null,canopyOptions);
      if(i<roofColumns) roofEdge(a,canopyPoint((i+1)/roofColumns,j/roofRows),j===0||j===roofRows);
      if(j<roofRows) roofEdge(a,canopyPoint(i/roofColumns,(j+1)/roofRows),i===0||i===roofColumns);
      if(i<roofColumns&&j<roofRows) roofEdge(a,canopyPoint((i+1)/roofColumns,(j+1)/roofRows));
    }

    box([0,-.3,0],[10.7,.4,12.7],'#e3ded3');
    box([0,-.08,0],[10.65,.04,12.65],'#f3efe6');
    for(let z=-6;z<=6;z+=.48) box([0,-.051,z],[10.6,.008,.012],'#d9d5cb');
    // A raised, permeable ground floor opens onto the covered street on both sides.
    for(let i=0;i<4;i++) box([0,-.35-i*.1,6.45+i*.22],[3.4+i*.26,.12,.3],'#e4dfd4');
    for(const x of [-6.25,6.25]) {
      const inner=x+(x<0?.7:-.7);
      // Each side is one continuous shophouse block with an uninterrupted covered walk.
      box([x,-.24,0],[1.6,.24,12.7],'#efeee9',null,{noPick:true});
      box([x,1.36,0],[1.22,2.8,12.7],'#e9ece6',null,{opacity:.42,noPick:true});
      box([x,2.82,0],[1.6,.12,12.9],'#dfe4de',null,{opacity:.65,noPick:true});
      box([inner,2.27,0],[.15,.13,12.7],'#c6cec3',null,{opacity:.7,noPick:true});
      for(let z=-6.15;z<=6.2;z+=1.76) box([inner,1.1,z],[.1,2.3,.1],'#c6cec3',null,{opacity:.65,noPick:true});
    }
    function railing(a,b,base,height=.72) {
      const length=Math.hypot(b[0]-a[0],b[1]-a[1]);
      const count=Math.ceil(length/.16);
      beam([a[0],base+height,a[1]],[b[0],base+height,b[1]],.055,'#b8a48b');
      for(let i=0;i<=count;i++) {
        const t=i/count;
        box([a[0]+(b[0]-a[0])*t,base+height/2,a[1]+(b[1]-a[1])*t],[.04,height,.04],'#b6a288');
      }
    }
    function deck(x,y,z,w,d) {
      box([x,y-.1,z],[w,.2,d],'#c9b79e');
      box([x,y+.01,z],[w,.035,d],'#e4d8c3');
      // Edge girders and transverse joists make the floor load path visible.
      for(const edge of [-1,1]) box([x+edge*(w/2-.14),y-.28,z],[.18,.25,d],'#a89478');
      for(let j=z-d/2+.16;j<z+d/2;j+=.78) box([x,y-.25,j],[w,.19,.11],'#b4a084');
      for(let a=x-w/2+.15;a<x+w/2;a+=.26) box([a,y+.034,z],[.009,.012,d],'#c9bda9');
    }
    function planting(x,y,z,w=1.1,d=.38,drop=.75) {
      box([x,y+.12,z],[w,.24,d],'#d3c9b6');
      box([x,y+.247,z],[w-.07,.025,d-.05],'#879381');
      for(let i=0;i<Math.ceil(w/.2);i++) {
        const px=x-w/2+.1+i*.2;
        ball([px,y+.38,z],[.25,.28,.3],i%2?'#8c9b7d':'#73876d');
        for(let j=0;j<3;j++) ball([px+.04*Math.sin(j+i),y+.13-j*drop/3,z+d*.53],[.13,.25,.12],'#7f9174');
      }
    }
    function stairs(x,z,y0,y1,direction=1) {
      const steps=14, run=2.3;
      for(let i=0;i<steps;i++) box([x,y0+(y1-y0)*(i+1)/steps-.04,z+direction*run*(i+.5)/steps],[.85,.08,run/steps+.025],'#cbbb9f');
      for(const edge of [-.37,.37]) beam([x+edge,y0-.08,z],[x+edge,y1-.08,z+direction*run],.12,'#93856f');
      for(const edge of [-.43,.43]) {
        beam([x+edge,y0+.63,z],[x+edge,y1+.63,z+direction*run],.035,'#b39b7c');
        for(let i=0;i<=steps;i+=2) box([x+edge,y0+(y1-y0)*i/steps+.3,z+direction*run*i/steps],[.025,.6,.025],'#b39b7c');
      }
    }
    // Staggered gallery plates frame the vertical ventilation void.
    deck(-2.65,1.85,-1.3,4.6,6.0);
    deck(2.65,3.7,-1.35,4.6,6.1);
    deck(2.5,1.85,-3.7,4.9,1.3);
    deck(-2.45,3.7,-3.7,4.9,1.3);
    deck(.05,1.85,-3.7,.95,1.3);
    deck(.05,3.7,-3.7,.95,1.3);
    // A small upper pavilion leaves the atrium and roof ventilation path open.
    deck(-2.9,5.55,-3.2,3.0,2.1);
    box([-4.32,6.03,-3.2],[.12,.92,2.1],'#e2d5bf');
    box([-2.9,6.03,-4.19],[3,.92,.1],'#e2d5bf');
    for(let x=-4.2;x<-1.5;x+=.13) box([x,6.11,-2.2],[.045,.72,.045],'#baa88d');
    // Deep timber screens and open balustrades echo the ventilated Malay-house facade.
    for(const [x,y] of [[-4.86,1.85],[4.86,3.7]]) {
      for(let z=-4.2;z<1.65;z+=.16) box([x,y+.72,z],[.09,1.42,.055],'#c1ad91');
      box([x,y+1.48,-1.3],[.18,.08,6.15],'#b6a185');
    }
    railing([-4.8,1.72],[-.5,1.72],1.85);
    railing([.5,1.72],[4.8,1.72],3.7);
    railing([-.42,-2.9],[-.42,1.15],1.85);
    railing([.42,-2.9],[.42,.2],3.7);
    planting(-2.5,1.88,1.6,2.8,.3,.85);
    planting(2.6,3.73,1.6,2.5,.3,.95);
    planting(-2.65,5.57,-2.17,1.1,.27,.65);
    stairs(-.03,2.25,0,1.85,-1);
    stairs(-.02,-.55,1.85,3.7,-1);
    stairs(-1.15,-3.3,3.7,5.55,1);
    // Continuous gallery supports carry the edge girders down to concrete shoes.
    for(const [x,top] of [[-4.8,1.85],[-.48,1.85],[.48,3.7],[4.8,3.7]]) {
      for(const z of [-4.05,-1.3,1.45]) {
        box([x,top/2-.12,z],[.15,top-.24,.15],'#a58f72');
        box([x,.04,z],[.32,.18,.32],'#c8c7bb');
        box([x,.18,z],[.2,.16,.2],'#8a8d7f');
        for(const y of [1.85,3.7]) if(y<=top) box([x,y-.26,z],[.22,.36,.22],'#938872');
      }
    }
    for(const x of [-4.2,-1.6]) for(const z of [-4.05,-2.35]) {
      box([x,3.63,z],[.14,3.7,.14],'#a58f72');
      box([x,5.3,z],[.22,.32,.22],'#938872');
    }
    // Tree columns: paired timber stems, bolted shoes, and three canopy struts.
    for(const x of [-4.3,4.3]) for(const z of [-4.55,-.9,3.8]) {
      const crown=canopyPoint((x+5.8)/11.6,(z+6.1)/12.2)[1]-.95;
      box([x,.02,z],[.38,.2,.38],'#c6c5b9');
      box([x,.2,z],[.23,.25,.22],'#888d7e');
      for(const dx of [-.07,.07]) box([x+dx,crown/2,z],[.1,crown,.14],'#ae987a');
      for(const y of [.35,1.75,crown-.18]) box([x,y,z],[.28,.1,.18],'#8e8875');
      ball([x,crown-.1,z],[.24,.2,.24],'#8e8875');
      for(const [dx,dz] of [[-.58,-.36],[.58,.36],[0,.6]]) {
        const tip=canopyPoint((x+dx+5.8)/11.6,(z+dz+6.1)/12.2,-.12);
        beam([x,crown-.1,z],tip,.12,'#ae987a');
        ball(tip,[.18,.13,.18],'#8e8875');
      }
    }
    // Open market stalls along the edge, with a clear public route through the middle.
    for(const x of [-3.7,3.7]) for(const z of [-2.7,.0]) {
      box([x,.5,z],[1.4,.95,.5],'#d5c3a9');
      box([x,.99,z],[1.55,.055,.65],'#e6d8c2');
      box([x,1.15,z-.55],[1.5,1.9,.065],'#c8b395');
      for(let art=0;art<3;art++) box([x-.47+art*.47,1.45+(art%2)*.15,z-.505],[.33,.48,.03],['#ced2bc','#d0b7a5','#aabdb6'][art]);
    }
    function tree(x,y,z,height=1.9) {
      tube([x,y+.15,z],[.75,.3,.75],'#e0d8c9');
      beam([x,y+.22,z],[x,y+height,z],.06,'#a08f75');
      for(let i=0;i<7;i++) {
        const angle=i*2.4;
        const tip=[x+Math.cos(angle)*.45,y+height-.45+(i%3)*.21,z+Math.sin(angle)*.4];
        beam([x,y+height*.66,z],tip,.025,'#a08f75');
        ball(tip,[.63,.34,.48],['#849578','#97a487','#75896f'][i%3]);
      }
    }
    tree(-3.9,0,4.65,1.95);tree(3.95,0,4.4,2.2);
    tree(-2.6,1.87,-3.7,1.1);tree(3.25,3.72,-3.65,1.05);
    // SOFTWARE & AI: each object depicts the project's input or output.
    workspace('software',-2.45,-1.5,'#c3dad4');
    table(0,-.85,4,1.25);
    table(-1.17,.93,1.48,.85);
    table(1.15,.93,1.45,.85);
    screen(-1.5,1.4,-1.17,1.08,.74,'#e9f3ef','three');
    // Sketch lines on screen become stepped, generated building volumes.
    for(let i=0;i<3;i++) {
      box([-1.82+i*.26,1.29+i*.07,-1.115],[.025,.27+i*.09,.012],'teal','three');
      box([-1.71+i*.26,1.42+i*.11,-1.115],[.24,.024,.012],'teal','three');
      house(-1.74+i*.26,.88,-.67,.22,.18+i*.13,'blue','three');
    }
    // A photo-retrieval board with a search field and visual results.
    screen(0,1.45,-1.16,1.05,.88,'#f2f8f4','lennar');
    box([0,1.72,-1.103],[.82,.09,.014],'#9cbfb4','lennar');
    for(let i=0;i<3;i++) for(let j=0;j<2;j++) {
      box([-.29+i*.29,1.26+j*.23,-1.1],[.235,.18,.02],['#94b6a6','#dbc0aa','#9ebebf'][(i+j)%3],'lennar');
      box([-.29+i*.29,1.23+j*.23,-1.084],[.13,.06,.012],'#fbfaf4','lennar');
    }
    // CAD solids: a bracket with a visible opening and separable components.
    tube([1.46,.9,-.87],[.93,.07,.82],'#ddebe8','cad');
    box([1.46,1.02,-.87],[.67,.13,.52],'teal','cad');
    for(const x of [1.17,1.75]) box([x,1.24,-.87],[.12,.47,.52],'blue','cad',{effect:[(x-1.46)*.65,.03,0]});
    box([1.46,1.5,-.87],[.67,.12,.52],'blue','cad',{effect:[0,.25,0]});
    tube([1.46,1.25,-.87],[.24,.23,.24],'#d8bda2','cad',{effect:[0,.18,.3]});
    // UniNest: a small neighborhood laid out on a housing-search map.
    box([-1.17,.89,.93],[1.38,.04,.74],'#c6dbc9','uninest');
    box([-1.17,.92,.93],[1.32,.02,.07],'#f9f5ee','uninest');
    for(let i=0;i<3;i++) house(-1.61+i*.43,.92,.76,.29,.26+i%2*.12,'orange','uninest');
    // BIM: repeated windows, with a single grounded element picked out in amber.
    for(let floor=0;floor<3;floor++) {
      box([1.15,.99+floor*.21,.85],[.73,.17,.61],'blue','aec');
      box([1.15,1.085+floor*.21,.85],[.83,.035,.7],'#fcf9f4','aec');
      for(let i=0;i<3;i++) box([.91+i*.23,1+floor*.21,1.163],[.13,.1,.02],floor===1&&i===1?'#d4ad89':'#3c6769','aec');
    }
    // COMPUTATIONAL DESIGN: a real desk, gestural surface, and paired displays.
    workspace('computational',2.45,-1.5,'#bed2c7');
    table(0,-.05,3.9,2.25);
    screen(-.94,1.62,-.77,1.48,.95,'#d0e4db','motion');
    for(let i=0;i<6;i++) box([-1.51+i*.2,1.36+i%3*.09,-.714],[.12,.024,.02],'#407265','motion');
    box([-.92,.91,-.25],[.95,.04,.32],'#f4f4f0','motion');
    for(let i=0;i<6;i++) for(let j=0;j<3;j++) box([-1.29+i*.15,.936,-.35+j*.09],[.11,.012,.05],'#94aaa1','motion');
    // A suspended parametric wire surface; hover sends a wave through its nodes.
    function surfacePoint(i,j) {
      return [-1.5+i*.19,1.29+.17*Math.sin(i*.65)*Math.cos(j*.55),.12+j*.13];
    }
    for(let i=0;i<8;i++) for(let j=0;j<7;j++) {
      const p=surfacePoint(i,j);
      ball(p,[.045,.045,.045],'#3e7365','motion',{wave:i*.65+j*.45});
      if(i<7) beam(p,surfacePoint(i+1,j),.018,'#568c7d','motion',{wave:i*.65+j*.45});
      if(j<6) beam(p,surfacePoint(i,j+1),.018,'#568c7d','motion',{wave:i*.65+j*.45});
    }
    tube([-.84,.94,1.07],[.27,.08,.27],'dark','motion');
    ball([-.84,1.005,1.07],[.14,.045,.14],'#b6d9d0','motion');
    // Sense Bridge: two people, two screens, one responsive connection.
    for(const x of [.58,1.54]) {
      screen(x,1.54,-.54,.78,.91,'#e5efe8','sense');
      ball([x,1.69,-.48],[.18,.18,.024],'#d3a899','sense');
      ball([x,1.4,-.48],[.37,.31,.026],'#65948f','sense');
      tube([x,.94,.32],[.27,.07,.27],'teal','sense');
    }
    for(let i=0;i<10;i++) {
      const x=.54+i*.11;
      ball([x,1.3+Math.sin(i/9*Math.PI)*.35,.31],[.052,.052,.052],'#cba68b','sense',{wave:i*.6});
    }
    // A desk chair and books belong to this workspace, not to unrelated projects.
    tube([.05,.41,1.27],[.12,.64,.12],'#4d645d');
    ball([.05,.71,1.27],[.76,.17,.63],'coral');
    box([.05,.99,1.56],[.72,.61,.1],'coral');
    for(let i=0;i<3;i++) box([-1.76,.9+i*.065,.81],[.27,.055,.38],['wood','blue','ivory'][i]);
    // FABRICATION: four physical prototypes on a generous making table.
    workspace('fabrication',0,3.0,'#e3d5c8');
    table(0,.08,4.05,2.57);
    // Panelling: a curved facade assembled from individually oriented panels.
    for(let column=0;column<6;column++) {
      const angle=(column-2.5)*.19;
      const x=-1.15+Math.sin(angle)*1.08, z=-.72+Math.cos(angle)*.22;
      for(let row=0;row<3;row++) {
        const c=Math.cos(angle), t=Math.sin(angle);
        box([x,1.05+row*.23,z],[.17,.205,.055],row%2?'#bb9d81':'#dccab2','panelling',
          {orientation:[c,0,-t,0,1,0,t,0,c],effect:[Math.sin(angle)*.13,.02,Math.cos(angle)*.15]});
      }
    }
    box([-1.15,.91,-.53],[1.38,.06,.62],'#eae2d5','panelling');
    // Weaving: crossing timber rods form a light lattice canopy.
    function lattice(i,j) { return [.49+i*.2,1.04+.43*Math.sin(i/6*Math.PI)*Math.sin(j/6*Math.PI),-.99+j*.16]; }
    for(let i=0;i<7;i++) for(let j=0;j<7;j++) {
      if(i<6) beam(lattice(i,j),lattice(i+1,j),.029,'wood','weaving');
      if(j<6) beam(lattice(i,j),lattice(i,j+1),.029,'#ccb59a','weaving');
    }
    for(const x of [.49,1.69]) for(const z of [-.99,-.03]) box([x,.98,z],[.035,.2,.035],'wood','weaving');
    // Droplet: a ribbed installation and its soft, suspended mist.
    tube([-1.15,.91,.94],[1.15,.045,.83],'#bcd8d2','droplet');
    for(let rib=0;rib<5;rib++) for(let i=0;i<12;i++) {
      const a=i/12*Math.PI,b=(i+1)/12*Math.PI,z=.67+rib*.135;
      beam([-1.15+Math.cos(a)*.46,.95+Math.sin(a)*.64,z],[-1.15+Math.cos(b)*.46,.95+Math.sin(b)*.64,z],.023,'#6b9589','droplet');
    }
    for(let i=0;i<7;i++) ball([-1.43+i*.1,1.1+i%3*.08,.92],[.25,.19,.26],'#f3f6f4','droplet',{opacity:.48,wave:i*.9});
    // Joinery: two notched timber members separate to reveal how they fit.
    box([1.12,.94,.95],[1.34,.04,.9],'#eee7db','joinery');
    for(const x of [.74,1.5]) box([x,1.11,.95],[.49,.24,.25],'wood','joinery',{effect:[0,0,-.24]});
    box([1.12,1.045,.95],[.29,.11,.25],'wood','joinery',{effect:[0,0,-.24]});
    for(const z of [.58,1.32]) box([1.12,1.23,z],[.25,.24,.49],'#d1b99c','joinery',{effect:[0,.27,.12]});
    box([1.12,1.29,.95],[.25,.11,.29],'#d1b99c','joinery',{effect:[0,.27,.12]});
    box([1.82,.93,1.14],[.17,.04,.46],'#486c61');
    for(let i=0;i<7;i++) box([1.82,.955,.96+i*.055],[.12,.008,.008],'#e5eee8');

    const framingBounds=[];
    for(const item of meshes) {
      const bounds={zone:item.zone,roof:item.roof,min:[Infinity,Infinity,Infinity],max:[-Infinity,-Infinity,-Infinity]};
      framingBounds.push(bounds);
      const m=item.orientation,v=item.shape.vertices;
      for(let j=0;j<v.length;j+=6) for(let axis=0;axis<3;axis++) {
        const n=item.position[axis]+m[axis]*v[j]*item.size[0]+m[axis+3]*v[j+1]*item.size[1]+m[axis+6]*v[j+2]*item.size[2];
        bounds.min[axis]=Math.min(bounds.min[axis],n);
        bounds.max[axis]=Math.max(bounds.max[axis],n);
      }
    }
    const framingCorners=framingBounds.map(bounds=>({...bounds,points:Array.from({length:8},(_,i)=>[0,1,2].map(axis=>i&(1<<axis)?bounds.max[axis]:bounds.min[axis]))}));

    const staticBatches = new Map();
    const animatedMeshes = [];
    for (const item of meshes) {
      if (item.group || item.effect || item.wave !== undefined) { animatedMeshes.push(item); continue; }
      const key = JSON.stringify([item.zone,item.color,item.roof || false,item.opacity,item.perforation || 0]);
      let batch=staticBatches.get(key);
      if(!batch) {
        batch={...item,position:[0,0,0],size:[1,1,1],orientation:identity,bounds:[1,1,1],vertices:[],pickParts:[]};
        staticBatches.set(key,batch);
      }
      const m=item.orientation;
      const rotate=v=>[0,1,2].map(i=>m[i]*v[0]+m[i+3]*v[1]+m[i+6]*v[2]);
      const vertices=item.shape.vertices;
      for(let i=0;i<vertices.length;i+=6) {
        const p=rotate([0,1,2].map(k=>vertices[i+k]*item.size[k])).map((n,k)=>n+item.position[k]);
        const n=rotate(normalized([0,1,2].map(k=>vertices[i+3+k]/item.size[k])));
        batch.vertices.push(...p,...n);
      }
      if(!item.noPick) batch.pickParts.push(item);
    }
    meshes.length=0;
    for(const batch of staticBatches.values()) {
      batch.shape=geometry(batch.vertices);
      delete batch.vertices;
      meshes.push(batch);
    }
    meshes.push(...animatedMeshes);

    const initial = { yaw:.57, pitch:.38, zoom:.62, roof:0, x:0, y:2.1, z:.2, panX:0, panY:0 };
    const exposure = {house:1,software:1,computational:1,fabrication:1};
    const target = { ...initial };
    const current = { ...initial };
    let width = 1, height = 1, right = [1,0,0], up = [0,1,0], eye = [0,0,1], span = [4,3];
    let center = [0,1.45,0], screenOffset=[0,0];
    const heroCopy=document.querySelector('.hero-copy');
    const layout={introRight:0,introHeight:0};
    let framingCache=null,framingCurrent=null;
    function refreshLayout() {
      layout.introRight=heroCopy.offsetLeft+heroCopy.offsetWidth;
      layout.introHeight=heroCopy.offsetHeight;
      stage.style.setProperty('--intro-height',layout.introHeight+'px');
      framingCache=null;
      schedule();
    }
    // Framing follows the requested gallery immediately, independently of fading meshes.
    // Cache the destination until camera input or layout changes, including during hover.
    function desiredFraming() {
      const key=[activeCategory,width,height,layout.introRight,layout.introHeight,
        target.yaw,target.pitch,target.roof,target.zoom].join(':');
      if(framingCache?.key===key) return framingCache.value;
      const desktop=width>760;
      const left=desktop?layout.introRight+30:20;
      const top=desktop?100:layout.introHeight+65;
      const frameWidth=Math.max(1,width-20-left);
      const frameHeight=Math.max(1,height-(desktop?175:135)-top);
      const sy=Math.sin(target.yaw),cy=Math.cos(target.yaw);
      const sp=Math.sin(target.pitch),cp=Math.cos(target.pitch);
      const viewRight=[cy,0,-sy],viewUp=[-sy*sp,cp,-cy*sp];
      let minX=Infinity,maxX=-Infinity,minY=Infinity,maxY=-Infinity;
      for(const bounds of framingCorners) {
        if(activeCategory&&bounds.zone!==activeCategory) continue;
        const lift=bounds.roof?target.roof*1.65:0;
        for(const point of bounds.points) {
          const x=point[0]*viewRight[0]+point[2]*viewRight[2];
          const y=point[0]*viewUp[0]+(point[1]+lift)*viewUp[1]+point[2]*viewUp[2];
          minX=Math.min(minX,x);maxX=Math.max(maxX,x);
          minY=Math.min(minY,y);maxY=Math.max(maxY,y);
        }
      }
      const fitScale=Math.min(frameWidth/(maxX-minX),frameHeight/(maxY-minY));
      const baseScale=Math.min(activeCategory?95:34,(desktop?width*.54:width)/(activeCategory?7:19));
      const baseZoom=activeCategory?rooms[activeCategory].zoom:initial.zoom;
      const value={scale:Math.min(baseScale,fitScale*.96)*target.zoom/baseZoom,
        midX:(minX+maxX)/2,midY:(minY+maxY)/2,
        anchorX:left+frameWidth/2,anchorY:top+frameHeight/2};
      framingCache={key,value};
      return value;
    }

    let frame = 0, visible = true, lost = false, hover = null;
    let lastTime = 0;
    const start = performance.now();
    const rise = Object.fromEntries(Object.keys(projects).map(id => [id,0]));
    const labelButtons = [...labels.querySelectorAll('button')];
    let actualMeshes = [];

    function schedule() {
      if (!frame && visible && !document.hidden && !lost) frame = requestAnimationFrame(render);
    }
    function project(point) {
      const v = point.map((n,i) => n-center[i]);
      const dot = vector => v.reduce((sum,n,i) => sum+n*vector[i],0);
      return [(dot(right)/span[0]*.5+.5+screenOffset[0]*.5)*width, (.5-dot(up)/span[1]*.5-screenOffset[1]*.5)*height];
    }
    function render(time) {
      frame = 0;
      const delta = Math.min((time-lastTime)/1000 || .016, .05);
      lastTime = time;
      const easing = motion.matches ? 1 : 1-Math.exp(-delta*14);
      let unsettled = false;
      for (const key of Object.keys(current)) {
        current[key] += (target[key]-current[key])*easing;
        if (Math.abs(target[key]-current[key]) > .0005) unsettled = true;
      }
      for (const key of Object.keys(rise)) {
        const desired = selected === key || hover === key ? .075 : 0;
        rise[key] += (desired-rise[key])*easing;
        if (Math.abs(desired-rise[key]) > .0005) unsettled = true;
      }
      const fadeEasing=motion.matches?1:1-Math.exp(-delta*18);
      for(const key of Object.keys(exposure)) {
        const desired = !activeCategory || activeCategory===key ? 1 : 0;
        exposure[key] += (desired-exposure[key])*fadeEasing;
        if(Math.abs(desired-exposure[key])<.001) exposure[key]=desired;
        if(Math.abs(desired-exposure[key])>.001) unsettled=true;
      }
      const { yaw, pitch, zoom } = current;
      eye = [Math.sin(yaw)*Math.cos(pitch), Math.sin(pitch), Math.cos(yaw)*Math.cos(pitch)];
      right = [Math.cos(yaw),0,-Math.sin(yaw)];
      up = [-Math.sin(yaw)*Math.sin(pitch),Math.cos(pitch),-Math.cos(yaw)*Math.sin(pitch)];
      const destination=desiredFraming();
      if(!framingCurrent) framingCurrent={...destination};
      for(const key of Object.keys(destination)) {
        framingCurrent[key]+=(destination[key]-framingCurrent[key])*easing;
        if(Math.abs(destination[key]-framingCurrent[key])>.0005) unsettled=true;
        else framingCurrent[key]=destination[key];
      }
      // The page anchor stays put; only the model's framing animates toward its destination.
      const {scale,midX,midY,anchorX,anchorY}=framingCurrent;
      span=[width/(2*scale),height/(2*scale)];
      center=[current.x,current.y,current.z];
      const centerX=center.reduce((sum,n,i)=>sum+n*right[i],0);
      const centerY=center.reduce((sum,n,i)=>sum+n*up[i],0);
      screenOffset=[(anchorX+current.panX-width/2-(midX-centerX)*scale)*2/width,
        (height/2-anchorY-current.panY-(midY-centerY)*scale)*2/height];
      gl.viewport(0,0,canvas.width,canvas.height);
      gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
      gl.uniform3fv(uniforms.cameraRight,right);
      gl.uniform3fv(uniforms.cameraUp,up);
      gl.uniform3fv(uniforms.cameraEye,eye);
      gl.uniform3fv(uniforms.cameraTarget,center);
      gl.uniform2fv(uniforms.span,span);
      gl.uniform2fv(uniforms.screenOffset,screenOffset);
      const entry = motion.matches ? 1 : Math.min(1,(time-start)/1300);
      const entryOffset = (1-entry)**3;
      actualMeshes = [];
      let lastShape = null;
      const drawing = meshes.map(item=>({item,alpha:item.opacity*exposure[item.zone]})).filter(draw=>draw.alpha>.005).sort((a,b)=>b.alpha-a.alpha);
      for (const {item,alpha} of drawing) {
        const group = projectForObject(item.group);
        const position = [...item.position];
        const activation = group ? rise[group]/.075 : 0;
        if(item.effect) for(let axis=0;axis<3;axis++) position[axis]+=item.effect[axis]*activation;
        if(item.wave !== undefined && !motion.matches) position[1]+=Math.sin(time*.002+item.wave)*.09*activation;
        position[1] += (item.roof ? current.roof*1.65 : 0) + (group ? rise[group] : 0);
        position[1] += entryOffset * Math.max(0,item.position[1]) * .8;
        if (item.shape !== lastShape) {
          gl.bindBuffer(gl.ARRAY_BUFFER,item.shape.buffer);
          gl.vertexAttribPointer(positions,3,gl.FLOAT,false,24,0);
          gl.vertexAttribPointer(normals,3,gl.FLOAT,false,24,12);
          lastShape = item.shape;
        }
        gl.uniform3fv(uniforms.objectPosition,position);
        gl.uniform3fv(uniforms.objectSize,item.size);
        gl.uniformMatrix3fv(uniforms.orientation,false,item.orientation);
        gl.uniform1f(uniforms.opacity,alpha);
        gl.uniform1f(uniforms.perforation,item.perforation || 0);
        gl.depthMask(alpha>.98);
        const brightness = group ? rise[group]*.65 : 0;
        gl.uniform3fv(uniforms.color,item.color.map(c => Math.min(1,c+brightness)));
        gl.drawArrays(gl.TRIANGLES,0,item.shape.count);
        if(alpha>.5) {
          if(item.pickParts) {
            for(const part of item.pickParts) actualMeshes.push({...part,group:null,actualPosition:part.position});
          } else if(!item.noPick) actualMeshes.push({ ...item, group, actualPosition:position });
        }
      }
      gl.depthMask(true);
      const placedZones=[];
      for(const button of zoneLabels.querySelectorAll('button')) {
        if(zoneLabels.hidden) break;
        const room=rooms[button.dataset.room];
        const front=button.dataset.room==='software'?1.3:0;
        const [x,y]=project([room.x,room.level+1.4,room.z+front]);
        const w=button.offsetWidth,h=button.offsetHeight;
        const clampedX=Math.max(w/2+8,Math.min(width-w/2-8,x));
        let top=Math.max(24,y-h);
        for(let pass=0;pass<3;pass++) {
          const collision=placedZones.find(other=>Math.abs(clampedX-other.x)<(w+other.w)/2+8&&top<other.top+other.h+8&&top+h+8>other.top);
          if(!collision) break;
          top=collision.top+collision.h+9;
        }
        placedZones.push({x:clampedX,top,w,h});
        button.style.transform=`translate(${clampedX}px,${top}px) translateX(-50%)`;
      }
      const placedLabels = [];
      for (const button of labelButtons) {
        if (button.hidden) continue;
        const id = button.dataset.project;
        const anchor = [...projects[id].anchor];
        anchor[1] += rise[id] + entryOffset*Math.max(0,anchor[1])*.8;
        const [x,y] = project(anchor);
        const labelWidth = button.offsetWidth, labelHeight = button.offsetHeight;
        const clampedX = Math.max(labelWidth/2+8,Math.min(width-labelWidth/2-8,x));
        let top = Math.max(110,y-22-labelHeight);
        // Keep all active labels readable as their 3D anchors cross on rotation.
        for (let pass=0;pass<labelButtons.length;pass++) {
          const collision = placedLabels.find(other =>
            Math.abs(clampedX-other.x) < (labelWidth+other.width)/2+6 &&
            top < other.top+other.height+7 && top+labelHeight+7 > other.top);
          if (!collision) break;
          top = collision.top+collision.height+8;
        }
        placedLabels.push({ x:clampedX, top, width:labelWidth, height:labelHeight });
        button.style.transform = `translate(${clampedX}px,${top}px) translateX(-50%)`;
        button.classList.toggle('is-active',hover === id || selected === id);
      }
      if (unsettled || entry < 1 || ((hover || selected) && !motion.matches)) schedule();
    }

    // Orthographic ray picking respects opaque walls and the roof.
    function pick(clientX,clientY) {
      const bounds = canvas.getBoundingClientRect();
      const x = ((clientX-bounds.left)/width*2-1-screenOffset[0])*span[0];
      const y = (1-(clientY-bounds.top)/height*2-screenOffset[1])*span[1];
      const origin = center.map((n,i) => n+right[i]*x+up[i]*y+eye[i]*20);
      const direction = eye.map(n => -n);
      let nearest = Infinity, hit = null;
      for (const item of actualMeshes) {
        let near = -Infinity, far = Infinity;
        for (let axis = 0; axis < 3; axis++) {
          const minimum = item.actualPosition[axis]-item.bounds[axis]/2;
          const maximum = item.actualPosition[axis]+item.bounds[axis]/2;
          if (Math.abs(direction[axis]) < 1e-7) {
            if (origin[axis] < minimum || origin[axis] > maximum) { far = -Infinity; break; }
          } else {
            const a = (minimum-origin[axis])/direction[axis], b = (maximum-origin[axis])/direction[axis];
            near = Math.max(near,Math.min(a,b));
            far = Math.min(far,Math.max(a,b));
          }
        }
        if (far >= Math.max(near,0) && near < nearest) { nearest = near; hit = activeCategory ? item.group : (item.zone !== 'house' ? 'zone:'+item.zone : null); }
      }
      // An unlinked tabletop is still a surface, not empty background.
      return nearest === Infinity ? null : (hit || 'surface');
    }
    function highlight(id) {
      const project = projects[id] ? id : null;
      canvas.style.cursor = project || id?.startsWith('zone:') ? 'pointer' : 'grab';
      if (hover === project) return;
      hover = project;
      schedule();
    }
    // Zoom is relative to each view so entering a gallery starts at 100%.
    function zoomLimits() {
      const base=activeCategory ? rooms[activeCategory].zoom : initial.zoom;
      return {base,min:base*.65,max:base*4};
    }
    const zoomIn=document.getElementById('zoom-in');
    const zoomOut=document.getElementById('zoom-out');
    function syncZoomControls() {
      const {base,min,max}=zoomLimits();
      document.getElementById('zoom-level').textContent=Math.round(target.zoom/base*100)+'%';
      zoomIn.disabled=target.zoom>=max-.0001;
      zoomOut.disabled=target.zoom<=min+.0001;
    }
    function setZoom(value) {
      const {min,max}=zoomLimits();
      target.zoom=Math.max(min,Math.min(max,value));
      syncZoomControls();
      schedule();
    }
    zoomIn.addEventListener('click',()=>setZoom(target.zoom*1.15));
    zoomOut.addEventListener('click',()=>setZoom(target.zoom/1.15));
    canvas.addEventListener('wheel',event=>{
      event.preventDefault();
      const pixels=event.deltaY*(event.deltaMode===1?16:event.deltaMode===2?height:1);
      setZoom(target.zoom*Math.exp(-Math.max(-100,Math.min(100,pixels))*.0025));
      if(drag) drag.moved=true;
    },{passive:false});

    // Drag orbits, Shift + drag pans in screen pixels, and two pointers pinch.
    // Modified clicks and completed gestures never select a project.
    let drag=null, pinch=null;
    const pointers=new Map();
    const pointerDistance=()=>{
      const [a,b]=[...pointers.values()];
      return Math.hypot(a.x-b.x,a.y-b.y);
    };
    function beginDrag(point,moved=false) {
      return {...point,yaw:target.yaw,pitch:target.pitch,panX:target.panX,panY:target.panY,moved};
    }
    canvas.addEventListener('pointerdown',event=>{
      if(event.button!==0 || pointers.size>=2) return;
      const point={id:event.pointerId,x:event.clientX,y:event.clientY,pan:event.shiftKey};
      pointers.set(event.pointerId,point);
      canvas.setPointerCapture(event.pointerId);
      if(pointers.size===2) {
        drag=null;
        pinch={distance:Math.max(1,pointerDistance()),zoom:target.zoom};
        highlight(null);
      } else drag=beginDrag(point);
    });
    canvas.addEventListener('pointermove',event=>{
      if(pointers.has(event.pointerId)) {
        pointers.set(event.pointerId,{id:event.pointerId,x:event.clientX,y:event.clientY});
        if(pinch&&pointers.size===2) {
          setZoom(pinch.zoom*pointerDistance()/pinch.distance);
          return;
        }
        if(drag&&event.pointerId===drag.id) {
          const dx=event.clientX-drag.x,dy=event.clientY-drag.y;
          if(Math.hypot(dx,dy)>6) drag.moved=true;
          if(drag.moved) {
            if(drag.pan) {
              target.panX=drag.panX+dx;
              target.panY=drag.panY+dy;
            } else {
              target.yaw=drag.yaw+dx*.006;
              target.pitch=drag.pitch+dy*.006;
            }
            highlight(null);schedule();
          }
        }
      } else if(event.pointerType!=='touch') highlight(pick(event.clientX,event.clientY));
    });
    function finishPointer(event,allowClick) {
      if(!pointers.has(event.pointerId)) return;
      const clicked=allowClick&&!pinch&&drag?.id===event.pointerId&&!drag.moved&&!drag.pan;
      pointers.delete(event.pointerId);
      pinch=null;
      const remaining=[...pointers.values()][0];
      drag=remaining?beginDrag(remaining,true):null;
      if(canvas.hasPointerCapture(event.pointerId)) canvas.releasePointerCapture(event.pointerId);
      if(clicked) {
        const id=pick(event.clientX,event.clientY);
        if(id?.startsWith('zone:')) setCategory(id.slice(5));
        else if(projects[id]) openProject(id,labelButtons.find(button=>button.dataset.project===id));
        else if(id===null&&activeCategory) returnToHouse();
      }
    }
    canvas.addEventListener('pointerup',event=>finishPointer(event,true));
    canvas.addEventListener('pointercancel',event=>{finishPointer(event,false);highlight(null);});
    canvas.addEventListener('lostpointercapture',event=>finishPointer(event,false));
    canvas.addEventListener('pointerleave',()=>{if(!drag&&!pinch) highlight(null);});
    // The canvas owns orbit gestures; the introduction remains available for page scrolling.
    for(const type of ['touchstart','touchmove']) canvas.addEventListener(type,event=>{
      if(event.touches.length>1) event.preventDefault();
    },{passive:false});
    document.getElementById('rotate-left').addEventListener('click', () => { target.yaw-=.35; schedule(); });
    document.getElementById('rotate-right').addEventListener('click', () => { target.yaw+=.35; schedule(); });
    const roofToggle = document.getElementById('roof-toggle');
    function syncRoofButton() {
      roofToggle.setAttribute('aria-pressed',String(Boolean(target.roof)));
      document.getElementById('roof-label').textContent = target.roof ? 'Canopy lifted' : 'Lift canopy';
    }
    roofToggle.addEventListener('click', () => { target.roof = target.roof ? 0 : 1; syncRoofButton(); schedule(); });
    document.getElementById('reset-view').addEventListener('click', () => { applyRoomView(); });
    new ResizeObserver(entries => {
      const bounds = entries[0].contentRect;
      width = Math.max(1,bounds.width); height = Math.max(1,bounds.height);
      refreshLayout();
      const density = Math.min(window.devicePixelRatio || 1,2);
      canvas.width = Math.round(width*density); canvas.height = Math.round(height*density);
      schedule();
    }).observe(canvas);
    new ResizeObserver(refreshLayout).observe(heroCopy);
    new IntersectionObserver(entries => {
      visible = entries[0].isIntersecting;
      if (visible) schedule();
    },{ threshold:0 }).observe(stage);
    document.addEventListener('visibilitychange',schedule);
    motion.addEventListener('change',schedule);
    canvas.addEventListener('webglcontextlost', event => {
      event.preventDefault(); lost = true;
      if (frame) cancelAnimationFrame(frame);
      frame = 0;
      labels.hidden = true; controls.hidden = true; zoomControls.hidden = true; categoryControls.hidden = true; zoneLabels.hidden = true; backToHouse.hidden = true; hint.hidden = true; fallback.hidden = false;
      fallback.querySelector('p').textContent = 'The 3D view paused. You can still explore every project here.';
    });
    labels.hidden = false; controls.hidden = false; zoomControls.hidden = false; categoryControls.hidden = !activeCategory; zoneLabels.hidden = Boolean(activeCategory); hint.hidden = false; fallback.hidden = true;
    syncZoomControls(); schedule();
    function applyRoomView() {
      Object.assign(target,initial);
      if(activeCategory) Object.assign(target,rooms[activeCategory],{roof:1});
      // Only numeric camera values belong in the easing state.
      delete target.title; delete target.detail; delete target.level;
      highlight(null); syncRoofButton(); syncZoomControls(); schedule();
    }
    return {
      highlight,
      changeCategory:applyRoomView,
      focus(id) {
        const previous = { ...target };
        target.zoom = Math.min(target.zoom*1.04,zoomLimits().max); target.roof = 1;
        syncRoofButton(); syncZoomControls(); schedule();
        return previous;
      },
      restore(previous) {
        Object.assign(target,previous || initial); syncRoofButton(); syncZoomControls(); highlight(null); schedule();
      }
    };
  }

  try { renderer = createScene(); }
  catch (error) {
    console.warn('The open house is unavailable:',error);
    labels.hidden = true; controls.hidden = true; zoomControls.hidden = true; categoryControls.hidden = true; zoneLabels.hidden = true; backToHouse.hidden = true; hint.hidden = true; fallback.hidden = false;
  }
})();
