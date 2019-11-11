//Variaveis Gerais
var angle = document.getElementById("angle");
var animation = document.getElementsByClassName("animation")[0];
var IniciarRot = document.getElementById("IniciarRot");
var PararRot = document.getElementById("PararRot");

//Altera posição do Quadrado ao clicar em botões
var DistanciaEXS = document.getElementById("DistanciaEXS");
var DistanciaEYS = document.getElementById("DistanciaEYS");
var DistanciaEZS = document.getElementById("DistanciaEZS");
var DistanciaEXM = document.getElementById("DistanciaEXM");
var DistanciaEYM = document.getElementById("DistanciaEYM");
var DistanciaEZM = document.getElementById("DistanciaEZM");

var translatX = 0.1; 
var translatY = 0.1; 
var translatZ = 0.1; 

DistanciaEXS.onclick = () => {translatX = 0; translatX += 0.1; geometry.translate(translatX,0,0);}
DistanciaEYS.onclick = () => {translatY = 0; translatY += 0.1; geometry.translate(0,translatY,0);}
DistanciaEZS.onclick = () => {translatZ = 0; translatZ += 0.1; geometry.translate(0,0,translatZ);}
DistanciaEXM.onclick = () => {translatX = 0; translatX -= 0.1; geometry.translate(translatX,0,0);}
DistanciaEYM.onclick = () => {translatY = 0; translatY -= 0.1; geometry.translate(0,translatY,0);}
DistanciaEZM.onclick = () => {translatZ = 0; translatZ -= 0.1; geometry.translate(0,0,translatZ);}

//Altera a Rotação do Quadrado ao clicar em botoes
var RotationEXS = document.getElementById("RotationEXS");
var RotationEYS = document.getElementById("RotationEYS");
var RotationEZS = document.getElementById("RotationEZS");
var RotationEXM = document.getElementById("RotationEXM");
var RotationEYM = document.getElementById("RotationEYM");
var RotationEZM = document.getElementById("RotationEZM");

var RotationFullX = document.getElementById("RotationFullX");
var RotationFullY = document.getElementById("RotationFullY");
var RotationFullZ = document.getElementById("RotationFullZ");

//Altera cor do Quadrado
var inputColor = document.getElementById("inputColor");

inputColor.onchange = event => {
  event.preventDefault();
  scene.remove( cube );
  material = new THREE.MeshBasicMaterial( {color: `${inputColor.value}`, wireframe: true} );
  cube = new THREE.Mesh( geometry, material );
  scene.add( cube );
}

// Cria scene
var scene = new THREE.Scene();
scene.background = new THREE.Color();

// Cria Camera
var camera = new THREE.PerspectiveCamera( 33, window.innerWidth/window.innerHeight, 0.1, 1000 );

// Cria Render
var renderer = new THREE.WebGLRenderer({antialias: true});
renderer.setSize( window.innerWidth, window.innerHeight );
animation.appendChild( renderer.domElement );

//Ao alterar o tamanho da janela, é reajustado automaticamente
window.addEventListener( 'resize', onWindowResize, false );
function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize( window.innerWidth, window.innerHeight );
}

//Cria Controle de camera
var controls = new THREE.OrbitControls( camera, renderer.domElement );
//controls.update() must be called after any manual changes to the camera's transform
camera.position.set( 8, 15, 8 );
controls.update();

//Cria um cubo
var geometry = new THREE.BoxGeometry( 1, 1, 1, 4, 4, 4);
geometry.translate(0.5,0.5,0.5);
var material = new THREE.MeshBasicMaterial( {color: 'black', wireframe: true} );
var cube = new THREE.Mesh( geometry, material );

//Adiciona a Scene
scene.add( cube );
scene.add( new THREE.AxesHelper( 6 ) );

var animate = function () {
    requestAnimationFrame( animate );

    //Altera a Rotação do Quadrado ao clicar em botoes
    RotationEXS.onclick = () => {cube.rotation.x += 0.03;}
    RotationEYS.onclick = () => {cube.rotation.y += 0.03;}
    RotationEZS.onclick = () => {cube.rotation.z += 0.03;}
    RotationEXM.onclick = () => {cube.rotation.x -= 0.03;}
    RotationEYM.onclick = () => {cube.rotation.y -= 0.03;}
    RotationEZM.onclick = () => {cube.rotation.z -= 0.03;}

    if(RotationFullX.checked){
      cube.rotation.x += 0.01;
    }

    if(RotationFullY.checked){
      cube.rotation.y += 0.01;
    }

    if(RotationFullZ.checked){
      cube.rotation.z += 0.01;
    }

    
    angle.innerHTML = "X:" + Math.floor(THREE.Math.radToDeg(cube.rotation.x) % 360) + "º";
    angle.innerHTML +="<br> Y:"+ Math.floor(THREE.Math.radToDeg(cube.rotation.y) % 360) + "º";
    angle.innerHTML +="<br> Z:"+ Math.floor(THREE.Math.radToDeg(cube.rotation.z) % 360) + "º";

    renderer.render( scene, camera );
};

animate();