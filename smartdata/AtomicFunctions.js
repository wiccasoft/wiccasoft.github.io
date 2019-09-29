/* Sets of orbital creation */
  // Set up electrons inside their orbitals
  function makeElectronsAndOrbitals(currentElement) {

    // If there's an element onscreen, remove it
    if(typeof electrons !=='undefined'&&typeof filledOrbitals !=='undefined'&&typeof unfilledOrbitals !=='undefined') {
      scene.remove(electrons);
      scene.remove(filledOrbitals);
      scene.remove(unfilledOrbitals);
    }
    // Set up fresh groups
    electrons = new THREE.Group();
    filledOrbitals = new THREE.Group();
    unfilledOrbitals = new THREE.Group();
    // Iterate over shells and electron numbers given and create appropriately
    if(currentElement.layout[2].length>0) {
      currentElement.layout[2].forEach(function(element,index,array) {
        for(var shell in element) {
          if(shell==='1s') {
            var electronNumber = currentElement.layout[2][0][shell];
            sOrbital('1s',electronNumber,currentElement.info.atomicRadius, 50, color1s);
          }
          if(shell==='2p') {
            var electronNumber = currentElement.layout[2][0][shell];
            sOrbital('2s',electronNumber,currentElement.info.atomicRadius, 200, color2p);
            pOrbital('2p',electronNumber,currentElement.info.atomicRadius, 200, color2p, currentElement.info.period);
          }
          if(shell==='3p') {
            var electronNumber = currentElement.layout[2][0][shell];
            sOrbital('3s',electronNumber,currentElement.info.atomicRadius, 270, color3p);
            pOrbital('3p',electronNumber,currentElement.info.atomicRadius, 270, color3p, currentElement.info.period);
          }
          if(shell==='3d') {
            var electronNumber = currentElement.layout[2][0][shell];
            sOrbital('4s',electronNumber,currentElement.info.atomicRadius, 300, color3d);
            dOrbital('4d',electronNumber,currentElement.info.atomicRadius, 300, color3d, currentElement.info.period);
            pOrbital('4p',electronNumber,currentElement.info.atomicRadius, 300, color3d, currentElement.info.period);
          }
        }
      });
      scene.add(filledOrbitals);
      scene.add(unfilledOrbitals);
    }
  }

function dOrbital(orbitalLevel, electronNumber, radius, zoom, thisColor) {
  camera.position.x = zoom;
  camera.lookAt({x:0,y:0,z:0});
  // Set min radius (no smaller than neon after period 2)
  var maxRadius = radius/2;
  if(orbitalLevel==='4p') {
    if(maxRadius>110||period>4) {
      maxRadius = 115/2;
    }
  } else if(orbitalLevel==='5p') {
    if(maxRadius>111||period>5) {
      maxRadius = 40;
    }
  }
  // Create settings for orentiations of orbitals consecutively
  var radiusOfCorners = maxRadius*0.7;
  var orbitalOrientation = [{
    // 4 diagonals
      position : {x:0, y:-radiusOfCorners, z:radiusOfCorners},
      scale : {x:2, y:1, z:2},
      rotation : {x: 15, y:0, z:0}
    },{
      position : {x:0, y:-radiusOfCorners, z:-radiusOfCorners},
      scale : {x:2, y:1, z:2},
      rotation : {x: -15, y:0, z:0}
    },{
      position : {x:0, y:radiusOfCorners, z:-radiusOfCorners},
      scale : {x:2, y:1, z:2},
      rotation : {x: 15, y:0, z:0}
    },{
      position : {x:0, y:radiusOfCorners, z:radiusOfCorners},
      scale : {x:2, y:1, z:2},
      rotation : {x: -15, y:0, z:0}
    },{
    // 4 x axis fans
      position : {x:-radiusOfCorners, y:radiusOfCorners, z:0},
      scale : {x:2, y:1, z:2},
      rotation : {x: 0, y:0, z:-15}
    },{
      position : {x:radiusOfCorners, y:radiusOfCorners, z:0},
      scale : {x:2, y:1, z:2},
      rotation : {x: 0, y:0, z:15}
    },{
      position : {x:radiusOfCorners, y:-radiusOfCorners, z:0},
      scale : {x:2, y:1, z:2},
      rotation : {x: 0, y:0, z:-15}
    },{
      position : {x:-radiusOfCorners, y:-radiusOfCorners, z:0},
      scale : {x:2, y:1, z:2},
      rotation : {x: 0, y:0, z:15}
    },
    // 4 x axis fans
    {
      position : {x:radiusOfCorners, y:0, z:-radiusOfCorners},
      scale : {x:2, y:1, z:2},
      rotation : {x: 29.85, y:0, z:15}
    },{
      position : {x:-radiusOfCorners, y:0, z:radiusOfCorners},
      scale : {x:2, y:1, z:2},
      rotation : {x: 29.85, y:0, z:15}
    },{
      position : {x:-radiusOfCorners, y:0, z:-radiusOfCorners},
      scale : {x:2, y:1, z:2},
      rotation : {x: 29.85, y:0, z:-15}
    },{
      position : {x:radiusOfCorners, y:0, z:radiusOfCorners},
      scale : {x:2, y:1, z:2},
      rotation : {x: 29.85, y:0, z:-15}
    }];
  // Create orbitals consecutively, filling/not filling as appropriate
  var dOrbitalElectrons = electronNumber-3;
  for(var i=0;i<orbitalOrientation.length;i++) {
      var radius = maxRadius,
          segments = 16,
          rings = 16;
      var sphereMaterial = new THREE.MeshLambertMaterial({
        color: thisColor,
        transparent : true,
        opacity: 0.34,
        depthWrite: false
      });
      var sphere = new THREE.Mesh(
        new THREE.SphereGeometry(
          radius,
          segments,
          rings),
      sphereMaterial);
      sphere.transparent = true;
      sphere.scale.x = sphere.scale.x/orbitalOrientation[i].scale.x;
      sphere.scale.y = sphere.scale.y/orbitalOrientation[i].scale.y;
      sphere.scale.z = sphere.scale.z/orbitalOrientation[i].scale.z;
      sphere.position.x = orbitalOrientation[i].position.x;
      sphere.position.y = orbitalOrientation[i].position.y;
      sphere.position.z = orbitalOrientation[i].position.z;
      sphere.rotation.x = orbitalOrientation[i].rotation.x;
      sphere.rotation.y = orbitalOrientation[i].rotation.y;
      sphere.rotation.z = orbitalOrientation[i].rotation.z;
      if(dOrbitalElectrons>=i) {
        filledOrbitals.add(sphere);
        makeElectrons(1,
          {x1:-(radius/2), x2: radius/2, y1: -(radius*2), y2: radius*2, z1: -(radius), z2: radius,
            symmetric: {x: true, y: false, z: true},
            offset : orbitalOrientation[i].position
          }
        );
      } else {
        sphere.material.opacity = 0.1;
        unfilledOrbitals.add(sphere);
      }
  }
  // Circular orbital
  var torus = new THREE.Mesh(
    new THREE.TorusGeometry(
      30, 8, 5, 30),
  sphereMaterial);
  torus.rotation.x += 29.85;
  unfilledOrbitals.add(torus);
}

function pOrbital(orbitalLevel, electronNumber, radius, zoom, thisColor, period) {
  camera.position.x = zoom;
  camera.lookAt({x:0,y:0,z:0});
  // Set min radius (no smaller than neon after period 2)
  var maxRadius = radius/2;
  if(orbitalLevel==='2p') {
    if(maxRadius>72.5||period>2) {
      maxRadius = 20;
    }
  } else if(orbitalLevel==='3p') {
    if(maxRadius>90||period>3) {
      maxRadius = 35.5;
    }
  } else if(orbitalLevel==='4p') {
    if(maxRadius>111||period>4) {
      maxRadius = 40;
    }
  }
  // Create settings for orentiations of orbitals consecutively
  var orbitalOrientation = [{
      position : {x:0, y:-maxRadius, z:0},
      scale : {x:2, y:1, z:1.5}
    },{
      position : {x:-maxRadius, y:0, z:0},
      scale : {x:1, y:1.5, z:2}
    },{
      position : {x:0, y:0, z:-maxRadius},
      scale : {x:1.5, y:2, z:1}
    },{
      position : {x:0, y:maxRadius, z:0},
      scale : {x:2, y:1, z:1.5}
    },{
      position : {x:maxRadius, y:0, z:0},
      scale : {x:1, y:1.5, z:2}
    },{
      position : {x:0, y:0, z:maxRadius},
      scale : {x:1.5, y:2, z:1}
  }];
  // Create orbitals consecutively, filling/not filling as appropriate
  var pOrbitalElectrons = electronNumber-3;
  for(var i=0;i<orbitalOrientation.length;i++) {
    var radius = maxRadius,
        segments = 16,
        rings = 16;
    var sphereMaterial = new THREE.MeshLambertMaterial({
      color: thisColor,
      transparent : true,
      opacity: 0.34,
      depthWrite: false
    });
    var sphere = new THREE.Mesh(
      new THREE.SphereGeometry(
        radius,
        segments,
        rings),
    sphereMaterial);
    sphere.transparent = true;
    sphere.scale.x = sphere.scale.x/orbitalOrientation[i].scale.x;
    sphere.scale.y = sphere.scale.y/orbitalOrientation[i].scale.y;
    sphere.scale.z = sphere.scale.z/orbitalOrientation[i].scale.z;
    sphere.position.x = orbitalOrientation[i].position.x;
    sphere.position.y = orbitalOrientation[i].position.y;
    sphere.position.z = orbitalOrientation[i].position.z;
    if(pOrbitalElectrons>=i) {
      filledOrbitals.add(sphere);
      makeElectrons(1,
        {x1:-(radius/2), x2: radius/2, y1: -(radius*2), y2: radius*2, z1: -(radius), z2: radius,
          symmetric: {x: true, y: false, z: true},
          offset : orbitalOrientation[i].position
        }
      );
    } else {
      sphere.material.opacity = 0.1;
      unfilledOrbitals.add(sphere);
    }
  }
}

function sOrbital(orbitalLevel, electronNumber, radius, zoom, thisColor) {
  camera.position.x = zoom;
  camera.lookAt({x:0,y:0,z:0});
  // Set maximum radius for larger elements (no exceeding Helium)
  var maxRadius = radius;
  // Set different orbital variables
  if(orbitalLevel==='1s') {
    if(radius>25) {
      maxRadius = 13;
    }
  } else if(orbitalLevel==='2s') {
    if(radius>145) {
      maxRadius = 40;
    }
  } else if(orbitalLevel==='3s') {
    if(radius>180) {
      maxRadius = 71;
    }
  } else if(orbitalLevel==='4s') {
    if(radius>220) {
      maxRadius = 80;
    }
  }
  // Create shell
  var radius = maxRadius,
      segments = 16,
      rings = 16;

  var sphereMaterial =
    new THREE.MeshLambertMaterial({
      color: thisColor,
      transparent : true,
      opacity: 0.34,
      depthWrite: false
    });

  var sphere = new THREE.Mesh(
    new THREE.SphereGeometry(
      radius,
      segments,
      rings),

    sphereMaterial);
  sphere.transparent = true;
  if(electronNumber>=2) {
    filledOrbitals.add(sphere);
    // Set maximum for electrons in this orbital (2)
    electronNumber = 2;
  } else {
    sphere.material.opacity = 0.1;
    unfilledOrbitals.add(sphere);
  }
  makeElectrons(electronNumber, {
      x1:-(radius), x2: radius, y1: -(radius), y2: radius, z1: -(radius), z2: radius,
      symmetric: {x: true, y: true, z: true},
      offset : {x : 0, y: 0, z: 0}
    }
  )
}

/* Create electrons and set interval event */
function makeElectrons(numberInThisShell,shellConstraints) {
  var allElectrons = [];
  for(var i = 0;i<numberInThisShell;i++) {
    var xPosition = getRandomValue(shellConstraints.x1,shellConstraints.x2,shellConstraints.symmetric.x);
    var yPosition = getRandomValue(shellConstraints.y1,shellConstraints.y2,shellConstraints.symmetric.y);
    var zPosition = getRandomValue(shellConstraints.z1,shellConstraints.z2,shellConstraints.symmetric.z);

    var radius = 1,
        segments = 16,
        rings = 16;

    var sphereMaterial =
      new THREE.MeshLambertMaterial(
        {
          color: electronColor,
          transparent : true,
          opacity: 0.8
        });

    var sphere = new THREE.Mesh(

      new THREE.SphereGeometry(
        radius,
        segments,
        rings),

      sphereMaterial);
    sphere.transparent = true;
    sphere.position.set(xPosition,yPosition,zPosition);
    electrons.add(sphere);
    // currentAtom.add(sphere);
    allElectrons.push(sphere);
    setInterval(function() {
      if(moveElectrons) {
        for(i = 0; i < allElectrons.length; i++) {
          var xPosition = getRandomValue(shellConstraints.x1,shellConstraints.x2,shellConstraints.symmetric.x);
          var yPosition = getRandomValue(shellConstraints.y1,shellConstraints.y2,shellConstraints.symmetric.y);
          var zPosition = getRandomValue(shellConstraints.z1,shellConstraints.z2,shellConstraints.symmetric.z);
          // Dynamically modify positions allowed within a circle made by the radius of the two points
          // Assumes spheres are centered at 0,0
          var randomNumber = Math.random();
          if(randomNumber<=0.33) {
            var shellRadius = Math.abs((shellConstraints.x2-shellConstraints.x1)/2);
            var angleTheta = Math.acos(Math.abs(xPosition)/shellRadius);
            var maxValues = Math.sin(angleTheta);
            if(Math.abs(yPosition)>maxValues) {
              yPosition = (maxValues * Math.sign(yPosition)) + shellConstraints.offset.y;
            }
            if(Math.abs(zPosition)>maxValues) {
              zPosition = (maxValues * Math.sign(zPosition)) + shellConstraints.offset.z;
            }
          } else if(randomNumber>0.33&&randomNumber<0.66) {
            var shellRadius = Math.abs((shellConstraints.y2-shellConstraints.y1)/2);
            var angleTheta = Math.acos(Math.abs(yPosition)/shellRadius);
            var maxValues = Math.sin(angleTheta);
            if(Math.abs(xPosition)>maxValues) {
              xPosition = (maxValues * Math.sign(xPosition)) + shellConstraints.offset.x;
            }
            if(Math.abs(zPosition)>maxValues) {
              zPosition = (maxValues * Math.sign(zPosition)) + shellConstraints.offset.z;
            }
          } else if(randomNumber>=0.66) {
            var shellRadius = Math.abs((shellConstraints.z2-shellConstraints.z1)/2);
            var angleTheta = Math.acos(Math.abs(zPosition)/shellRadius);
            var maxValues = Math.sin(angleTheta);
            if(Math.abs(xPosition)>maxValues) {
              xPosition = (maxValues * Math.sign(xPosition)) + shellConstraints.offset.x;
            }
            if(Math.abs(yPosition)>maxValues) {
              yPosition = (maxValues * Math.sign(yPosition)) + shellConstraints.offset.y;
            }
          }
          if(Math.sign(shellConstraints.offset.x)!==0) {
            xPosition = xPosition*Math.sign(shellConstraints.offset.x*-1);
          }
          if(Math.sign(shellConstraints.offset.y)!==0) {
            yPosition = yPosition*Math.sign(shellConstraints.offset.y*-1);
          }
          if(Math.sign(shellConstraints.offset.z)!==0) {
            zPosition = zPosition*Math.sign(shellConstraints.offset.z*-1);
          }
          allElectrons[i].position.set(
            xPosition,
            yPosition,
            zPosition
          );
        }
      }
      render();
    },150);
  }

}

/* Proton and Neutron creation, chaining into orbital creation */
function makeProtonsAndNeutrons(elementName) {
  var loader = new THREE.FontLoader();
  loader.load( 'js/fonts/helvetiker_regular.typeface.js', function ( font ) {
    var counter = 0;
    for (var shellName in elementName.layout[2][0]) {
      var coordinates = {x: 0, y:0, z: 0};
      var fudgeFactor = 1.6;
      var lineCoords = [];
      var fontSizes = {big : 1.1, small : 0.8}
      if(shellName==='1s') {
        coordinates = {x: 6.5, y:6.5, z: 0};
        lineCoords = [new THREE.Vector3(2, 2, 0), new THREE.Vector3(6, 6, 0)];
        coordinates.y = elementName.info.atomicRadius+(elementName.layout[2][0][shellName]*0.15);
      } else if (shellName==='2p') {
        coordinates = {x: 6, y:12, z: 0};
        lineCoords = [new THREE.Vector3(0, 11+(elementName.layout[2][0][shellName]*0.17), 0), new THREE.Vector3(6.5, 17+(elementName.layout[2][0][shellName]*0.1), 0)];
        coordinates.y = elementName.info.atomicRadius+(elementName.layout[2][0][shellName]*0.15);
        fudgeFactor = 2;
        var fontSizes = {big : 1.3, small : 1}
      } else if (shellName==='3p') {
        coordinates = {x: 4.5, y:27, z: 0};
        lineCoords = [new THREE.Vector3(0, 21+(elementName.layout[2][0][shellName]*0.17), 0), new THREE.Vector3(6.5, 27+(elementName.layout[2][0][shellName]*0.1), 0)];
        coordinates.y = elementName.info.atomicRadius+(elementName.layout[2][0][shellName]*0.15);
        fudgeFactor = 2.2;
        var fontSizes = {big : 1.5, small : 1.2}
      }
      // Line and label
      var lineGeometry = new THREE.Geometry();
      var vertArray = lineGeometry.vertices;
      vertArray.push( lineCoords[0], lineCoords[1] );
      lineGeometry.computeLineDistances();
      var lineMaterial = new THREE.LineBasicMaterial( { color: 0xFFFFFF } );
      var line = new THREE.Line( lineGeometry, lineMaterial );
      // scene.add(line);
      // textLines.push(line);

      var geometry = new THREE.TextGeometry( shellName, {
        font: font,
        size : fontSizes.big,
        height: 0.2
      } );
      var geometry2 = new THREE.TextGeometry( elementName.layout[2][0][shellName], {
        font: font,
        size : fontSizes.small,
        height: 0.2
      } );

      var textMat = new THREE.MeshPhongMaterial({
        color: 0xffffff,
        specular: 0x333333
      });

      textMesh = new THREE.Mesh(geometry,textMat);
      textMesh.position.set(coordinates.x+(counter*1.8), coordinates.y, coordinates.z);
      textMesh2 = new THREE.Mesh(geometry2,textMat);
      textMesh2.position.set((coordinates.x+fudgeFactor)+(counter*1.8), (coordinates.y+1), coordinates.z);
      // // scene.add(textMesh);
      // textLayers.push(textMesh);
      // // scene.add(textMesh2);
      // textLayers.push(textMesh2);
      counter += 1;
    }
  });
  // Protons have atomic weight of 1 and radius of 0.5
  if(typeof protons !=='undefined'&&typeof neutrons !=='undefined') {
    scene.remove(protons);
    scene.remove(neutrons);
  }
  protons = new THREE.Group();
  neutrons = new THREE.Group();
  currentAtom = new THREE.Group();

  // Select the right element
  currentElement = elementName;
  if(currentElement) {

    // Colour is blue
    for(var i = 0; i < currentElement.layout[0].length; i++) {
      var radius = 0.5,
          segments = 16,
          rings = 16;

      var sphereMaterial =
        new THREE.MeshLambertMaterial(
          {
            color: protonColor
          });

      var sphere = new THREE.Mesh(

        new THREE.SphereGeometry(
          radius,
          segments,
          rings),

        sphereMaterial);
      sphere.transparent = true;
      var xPositionOffset = currentElement.layout[0][i].x;
      var yPositionOffset = currentElement.layout[0][i].y;
      var zPositionOffset = currentElement.layout[0][i].z;
      sphere.position.set(xPositionOffset,yPositionOffset,zPositionOffset);
      // scene.add(sphere);
      if(i === 0) {
        currentAtom.add(sphere);
        protons.add(sphere);
      } else {
        protons.add(sphere);
        // currentAtom.add(sphere);
      }
    }
    scene.add(protons);
    // Neutrons have an atomic weight of 1 and radius of 0.5
    // Colour is brown neutral
    for(var i = 0; i < currentElement.layout[1].length; i++) {
      var radius = 0.5,
          segments = 16,
          rings = 16;

      var sphereMaterial =
        new THREE.MeshLambertMaterial(
          {
            color: neutronColor
          });

      var sphere = new THREE.Mesh(

        new THREE.SphereGeometry(
          radius,
          segments,
          rings),

        sphereMaterial);
      sphere.transparent = true;
      var xPositionOffset = currentElement.layout[1][i].x;
      var yPositionOffset = currentElement.layout[1][i].y;
      var zPositionOffset = currentElement.layout[1][i].z;
      sphere.position.set(xPositionOffset,yPositionOffset,zPositionOffset);
      neutrons.add(sphere);
      // currentAtom.add(sphere);
    }
    scene.add(neutrons);
  }
  makeElectronsAndOrbitals(currentElement);
}

/* HELPER FUNCTIONS */

// Random value inside a max/min for electron generation
function getRandomValue(min,max,symmetric) {
  // This number should accurately represent the space in the circle for 1s
  var number = 0;
  if(Math.random()>0.5&&symmetric) {
    number = Math.random() * (0-(max/2)) - min;
  } else {
    number = Math.random() * (0+(max/2)) + min;
  }
  return number;
}
