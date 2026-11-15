(function(){
  const palettes=[0xc7b596,0xb98261,0xb4aa91,0x8b9aa0,0xd4c8ae,0xc6a879,0xa1b0ae,0xbf9068];
  window.createProvinceLandmark=function(regionNumber){
    const THREE=window.THREE;
    const info=window.turkeyRegions[regionNumber-1],text=(info[1]+" "+info[2]).toLocaleLowerCase("tr-TR"),g=new THREE.Group(),baseColor=palettes[(regionNumber-1)%palettes.length];
    let kind="caravanserai";
    if(/köprü/.test(text))kind="bridge";
    else if(/evleri|eski şehir|cunda|odunpazarı|amasra|taraklı|safranbolu|kaleiçi/.test(text))kind="oldtown";
    else if(/camii|cami/.test(text))kind="mosque";
    else if(/kilise|manastır/.test(text))kind="church";
    else if(/kale|sur|saray/.test(text))kind="fortress";
    else if(/antik|höyük|ören|harabe|göbeklitepe|hattuşa|aphrodisias|aizanoi|blaundus|sardes|troya|sagalassos/.test(text))kind="ruins";
    else if(/müze|müzesi/.test(text))kind="museum";
    else if(/türbe|mezarl|anıtkabir|medrese|minare/.test(text))kind="monument";
    else if(/vapur|bandırma/.test(text))kind="ship";
    else if(/mağara/.test(text))kind="cave";
    else if(/göl|dağ|yayla|vadi|şelale|orman|longoz|ada|burnu|kanyon|park|termal|uludağ|boztepe|salda|ölydeniz|lavanta/.test(text))kind="nature";
    else if(/camii|cami|çarşı/.test(text))kind="mosque";
    const stone=new THREE.MeshStandardMaterial({color:baseColor,roughness:.88}),pale=new THREE.MeshStandardMaterial({color:0xe5d7be,roughness:.76}),roof=new THREE.MeshStandardMaterial({color:regionNumber%2?0x9c5540:0x536d83,roughness:.83}),dark=new THREE.MeshStandardMaterial({color:0x27333d,roughness:.92}),gold=new THREE.MeshStandardMaterial({color:0xc6a15b,metalness:.48,roughness:.42}),glass=new THREE.MeshStandardMaterial({color:0x72c4d2,emissive:0x13323c,roughness:.22});
    const add=(geometry,material,x,y,z,scale=null)=>{const m=new THREE.Mesh(geometry,material);m.position.set(x,y,z);if(scale)m.scale.set(...scale);m.castShadow=true;m.receiveShadow=true;g.add(m);return m};
    const box=(w,h,d,material,x,y,z)=>add(new THREE.BoxGeometry(w,h,d),material,x,y,z);
    const cyl=(top,bottom,h,material,x,y,z,n=16)=>add(new THREE.CylinderGeometry(top,bottom,h,n),material,x,y,z);
    const cone=(r,h,material,x,y,z,n=8)=>add(new THREE.ConeGeometry(r,h,n),material,x,y,z);
    const dome=(r,h,material,x,y,z)=>add(new THREE.SphereGeometry(r,20,12),material,x,y,z,[1,h/r,1]);
    const tower=(x,z,h=8)=>{box(1.15,h*.68,1.15,stone,x,h*.34,z);cone(.98,h*.23,roof,x,h*.81,z);cyl(.48,.56,.16,gold,x,h*.94,z,12)};
    const windows=(w,h,d,x,y,z,cols=3,rows=2)=>{for(let r=0;r<rows;r++)for(let c=0;c<cols;c++)box(.34,.58,.045,glass,x+(c-(cols-1)/2)*(w/cols),y+r*(h/rows),z-d/2-.03)};
    box(13,.42,10,stone,0,.21,0);
    if(kind==="bridge"){
      box(5,.58,10,pale,0,3.2,0);for(const z of [-3.2,0,3.2]){const arch=add(new THREE.TorusGeometry(2.15,.27,9,28,Math.PI),pale,0,1.55,z);arch.rotation.y=Math.PI/2}for(const x of [-2,0,2])box(.34,1.5,10,gold,x,2.45,0);box(5,.18,10,gold,0,3.58,0);
    }else if(kind==="mosque"){
      box(8,3.5,7,stone,0,2.2,0);box(8.5,.35,7.5,pale,0,4.05,0);dome(2.45,1.2,pale,0,4.95,0);for(const [x,z] of [[-4.8,-2.5],[4.8,-2.5],[-4.8,2.5],[4.8,2.5]])tower(x,z,8.8);for(const x of [-2,0,2])box(.42,1.3,.05,glass,x,2.2,-3.54);cyl(.06,.06,.55,gold,0,6.5,0,10);
    }else if(kind==="church"){
      box(8,3.2,11,stone,0,1.9,0);box(8.4,.32,11.4,pale,0,3.65,0);for(const z of [-3.7,0,3.7]){const arch=add(new THREE.TorusGeometry(1,.16,8,20,Math.PI),pale,0,2.35,z);arch.rotation.y=Math.PI/2}tower(-3.2,-5,10);for(const x of [-2,0,2])box(.36,1.1,.05,glass,x,2.2,-5.54);cyl(.08,.08,.8,gold,-3.2,10.5,-5,10);
    }else if(kind==="fortress"){
      box(10,4.2,8,stone,0,2.5,0);box(10.6,.5,8.6,pale,0,4.85,0);for(const x of [-5,5])for(const z of [-4,4]){cyl(.92,1.05,7,stone,x,3.5,z,12);cone(1.15,1.4,roof,x,7.7,z)}for(let x=-4.2;x<=4.2;x+=1.4)box(.5,.42,.5,pale,x,5.2,-4);
    }else if(kind==="ruins"){
      box(10,.55,8,stone,0,.52,0);box(9,.42,7,pale,0,.99,0);for(const z of [-2.5,2.5])for(const x of [-3.6,-1.2,1.2,3.6]){cyl(.28,.34,4.2,pale,x,3.15,z,12);cyl(.45,.45,.24,gold,x,5.3,z,12)}box(9.5,.62,1.0,stone,0,5.5,-2.5);const ped=cone(4.7,1.8,pale,0,6.65,-2.5,4);ped.rotation.y=Math.PI/4;
    }else if(kind==="oldtown"){
      const house=(x,z,w,h,color)=>{const wall=new THREE.MeshStandardMaterial({color,roughness:.9});box(w,h,w*.78,wall,x,h/2+.45,z);const top=cone(w*.76,h*.48,roof,x,h+.56,z,4);top.rotation.y=Math.PI/4;for(const side of [-1,1])box(.38,.65,.05,glass,x+side*w*.23,1.35,z-w*.4)};house(-3,-2,3.7,4.4,0xd8c4a4);house(2.5,-2.7,3.1,5.2,0xc4a886);house(-1,2.6,3.2,3.6,0xe1d4ba);house(4,2.5,2.7,4.4,0xb9936a);box(10,.28,8,gold,0,.55,0);
    }else if(kind==="museum"){
      box(10,2.5,7,pale,0,1.65,0);box(11,.3,8,stone,0,3.05,0);for(let x=-4;x<=4;x+=2)cyl(.16,.21,2.6,gold,x,1.75,-3.55,12);box(11,.25,8,pale,0,3.35,0);for(let x of [-3,0,3])box(1.2,1.15,.05,glass,x,1.7,-3.55);dome(1.45,.78,roof,0,4.2,0);
    }else if(kind==="monument"){
      box(9,.7,8,pale,0,.56,0);box(7,.65,6,stone,0,1.2,0);box(5,3.5,4,pale,0,3.25,0);dome(2.1,1.25,roof,0,5.45,0);for(const x of [-2.6,2.6])cyl(.18,.22,3.1,gold,x,3,0,12);cyl(.14,.16,2.5,stone,0,6.9,-2.8,12);cone(.42,.75,gold,0,8.5,-2.8,8);
    }else if(kind==="cave"){
      for(let i=0;i<5;i++){const rock=cone(2.8+((i+regionNumber)%3)*.7,7+((i*3+regionNumber)%5),i%2?pale:stone,(i-2)*2.7,3.2,(i%2)*3,7);rock.scale.z=1.4}const mouth=add(new THREE.TorusGeometry(1.55,.34,9,24,Math.PI),dark,0,1.1,-4);mouth.rotation.y=Math.PI/2;box(3.1,1.2,.3,dark,0,.55,-4);
    }else if(kind==="coastal"){
      const sea=new THREE.MeshStandardMaterial({color:0x278d9c,roughness:.25,metalness:.2});const water=add(new THREE.PlaneGeometry(13,10),sea,0,.48,0);water.rotation.x=-Math.PI/2;cyl(.55,.78,6,pale,0,3.5,-2,20);cone(.9,1.2,roof,0,7.1,-2,12);box(1.25,1,.08,glass,0,4.7,-2.42);for(const x of [-4,4]){box(2.6,2.8,2.3,stone,x,1.8,1.8);const r=cone(1.8,1.1,roof,x,3.75,1.8,4);r.rotation.y=Math.PI/4}
    }else if(kind==="ship"){
      const hull=box(10,1.8,3.2,roof,0,1.55,0);hull.rotation.z=Math.PI;box(5,2,2.5,pale,0,3.35,0);for(const x of [-2.5,0,2.5])box(.2,4,.2,stone,x,6,0);for(const x of [-2.5,0,2.5]){const sail=cone(1.7,2.7,pale,x+1.05,6.1,0,3);sail.rotation.z=Math.PI/2}box(4,.28,.4,gold,0,4.55,-1.45);
    }else if(kind==="nature"){
      const rock=new THREE.MeshStandardMaterial({color:0x647b71,roughness:1}),water=new THREE.MeshStandardMaterial({color:0x3fabb2,roughness:.27,metalness:.16});for(let i=0;i<5;i++){const peak=cone(3.3+(i%2),9+(i*regionNumber)%5,rock,(i-2)*2.8,4.9,(i%2)*2.4,7);peak.scale.z=1.5}const lake=add(new THREE.CircleGeometry(3.5,32),water,0,.53,2);lake.rotation.x=-Math.PI/2;for(const x of [-5,5]){const boulder=add(new THREE.DodecahedronGeometry(1.35,0),rock,x,1.1,3,[1.35,.8,1.7]);boulder.rotation.z=x*.07}
    }else{
      box(11,4.2,8,stone,0,2.5,0);box(11.5,.35,8.5,pale,0,4.8,0);for(let x=-4;x<=4;x+=2)cyl(.25,.3,3.7,pale,x,2.6,-4.05,12);box(2.3,2.6,.08,dark,0,1.7,-4.1);box(1,.5,.12,gold,0,5.25,-4.1);for(const x of [-4,4])box(.4,1.5,.4,gold,x,5.6,0);
    }
    return g;
  };
})();
