import { Mesh, Vector3, Color4, ParticleSystem, Texture, VertexBuffer }  from "@babylonjs/core"
export class artifice
{	
	constructor(scene)
	{
		this.scene = scene
		this.isTop = false;
		this.timer = 0;
		this.isFired = false;
		this.timer1 = 0;
		this.textureFirework = "textures/flare.png";
		this.posX = 0
		this.posY = 0
		this.posZ = 0
	}
	
	shoot(posX = 0, posY = -20, posZ = 0)
	{
		let startSphere = new Mesh.CreateSphere("Shoot", 4, 1, this.scene);
		startSphere.position = new Vector3(posX, posY, posZ);
		startSphere.isVisible = false; 
		
		let particleSystem = new ParticleSystem("particles", 350, this.scene);
		particleSystem.particleTexture = new Texture(this.textureFirework, this.scene);
		particleSystem.emitter = startSphere; 
		particleSystem.minEmitBox = new Vector3(0, 0, 0);
		particleSystem.maxEmitBox = new Vector3(0, 0, 0); 
		particleSystem.color1 = new Color4(1, 0.8, 1.0, 1.0);
		particleSystem.color2 = new Color4(1, 0.5, 1.0, 1.0);
		particleSystem.colorDead = new Color4(0, 0, 0.2, 0.5);
		particleSystem.minSize = 1;
		particleSystem.maxSize = 1;
		particleSystem.minLifeTime = 0.5;
		particleSystem.maxLifeTime = .5;
		particleSystem.emitRate = 350;
		particleSystem.blendMode = ParticleSystem.BLENDMODE_ONEONE;
		particleSystem.direction1 = new Vector3(0, -2, 0);
		particleSystem.direction2 = new Vector3(0, -2, 0);
		particleSystem.minEmitPower = 1;
		particleSystem.maxEmitPower = 1;
		particleSystem.updateSpeed = 0.005;
		
		let bigEnough = false;
		let updateFunction = function(particles) {
			for (let index = 0; index < particles.length; index++) {
				let particle = particles[index];
				particle.age += this._scaledUpdateSpeed;
				if (particle.age >= particle.lifeTime) {
					this.recycleParticle(particle);
					index--;
					continue;
				} else {
					if(!bigEnough){
						particle.size -= .01;                            
					}
					particle.direction.scaleToRef(particleSystem._scaledUpdateSpeed, particleSystem._scaledDirection);
					particle.position.addInPlace(particleSystem._scaledDirection);
					particleSystem.gravity.scaleToRef(particleSystem._scaledUpdateSpeed, particleSystem._scaledGravity);
					particle.direction.addInPlace(particleSystem._scaledGravity);
				}
			}
		};
		particleSystem.updateFunction = updateFunction;	
		particleSystem.start();    
		
		this.scene.registerBeforeRender(() => {
			if(!this.isFired){
				if(!this.isTop){
					startSphere.position.y += .5;
					if(startSphere.position.y > 30){
						this.isTop = !this.isTop;
						if (this.isTop ) {
							this.posX = startSphere.position.x
							this.posY = startSphere.position.y
							this.posZ = startSphere.position.z
						}
						particleSystem.stop();
						startSphere.position.x -= .5;
					}
				} else {
					this.timer +=5;
					if(this.timer == 125){
						for(let i = 0; i < 2; i++){
						   this.firework();
						}
						this.isFired = !this.isFired;
					}
				}
			}
		});
	}
           
  getRandomBetween(Min, Max){
      let Range = Max - Min;
      let Rand = Math.random();
      let num = Min + Math.round(Rand * Range);
      return num;
  }

  firework()
  { 
      let fountain = new Mesh.CreateSphere("explosion", 4, 1, this.scene);
      fountain.isVisible = false;
      fountain.position.x = this.posX
      fountain.position.y = this.posY
      fountain.position.z = this.posZ
      let perticleFromVerticesEmitter = fountain;
      perticleFromVerticesEmitter.useVertexColors = true;
      let verticesPositions = perticleFromVerticesEmitter.getVerticesData(VertexBuffer.PositionKind);
      let verticesNormals = perticleFromVerticesEmitter.getVerticesData(VertexBuffer.NormalKind);
      let verticesColor = [];

      for (let i = 0; i < verticesPositions.length; i += 3){
          let vertexPosition = new Vector3(
              verticesPositions[i],
              verticesPositions[i + 1],
              verticesPositions[i + 2]
          );
          let vertexNormal = new Vector3(
              verticesNormals[i],
              verticesNormals[i + 1],
              verticesNormals[i + 2]
          );
          let r = Math.random();
          let g = Math.random();
          let b = Math.random();
          let alpha = 1.0;
          let color = new Color4(r, g, b, alpha);
          verticesColor.push(r);
          verticesColor.push(g);
          verticesColor.push(b);
          verticesColor.push(alpha);
          let gizmo = Mesh.CreateBox('gizmo', 0.001, this.scene);
          gizmo.position = vertexPosition;
          gizmo.parent = perticleFromVerticesEmitter;
          this.createParticleSystem(gizmo, vertexNormal.normalize().scale(1), color);
      }

      perticleFromVerticesEmitter.setVerticesData(VertexBuffer.ColorKind, verticesColor);
  }
	
	createParticleSystem(emitter, direction, color)
	{
		let  bigEnough = false;
		let particleSystem1 = new ParticleSystem("particles", 500, this.scene);  
		let updateFunction = function(particles) {
			for (let index = 0; index < particles.length; index++) {
				let particle = particles[index];
				particle.age += this._scaledUpdateSpeed;
				if (particle.age >= particle.lifeTime) {
					this.recycleParticle(particle);
					index--;
					continue;
				} else {
					if(!bigEnough){
						particle.size = particle.size +.005;
						if(particle.size >= .162){
							bigEnough = !bigEnough;
						}
					}
					particle.direction.scaleToRef(particleSystem1._scaledUpdateSpeed, particleSystem1._scaledDirection);
					particle.position.addInPlace(particleSystem1._scaledDirection);
					particleSystem1.gravity.scaleToRef(particleSystem1._scaledUpdateSpeed, particleSystem1._scaledGravity);
					particle.direction.addInPlace(particleSystem1._scaledGravity);
				}
			}
		};
		particleSystem1.updateFunction = updateFunction;
		particleSystem1.domeRadius = 10;
		particleSystem1.particleTexture = new Texture(this.textureFirework, this.scene);
		particleSystem1.emitter = emitter; // the starting object, the emitter
		particleSystem1.minEmitBox = new Vector3(1, 0, 0); // Starting all from
		particleSystem1.maxEmitBox = new Vector3(1, 0, 0); // To...
		particleSystem1.color1 = color;
		particleSystem1.color2 = color;
		particleSystem1.colorDead = new Color4(0, 0, 0, 0.0);
		particleSystem1.minSize = .1;
		particleSystem1.maxSize = .1;
		particleSystem1.minLifeTime = 1;
		particleSystem1.maxLifeTime = 2;	
		particleSystem1.emitRate = 500;
		particleSystem1.blendMode = ParticleSystem.BLENDMODE_ONEONE;
		particleSystem1.gravity = new Vector3(0, -9.81, 0);
		particleSystem1.direction1 = direction;
		particleSystem1.direction2 = direction;            
		particleSystem1.minEmitPower = 10;
		particleSystem1.maxEmitPower = 13;
		particleSystem1.updateSpeed = 0.01;		
		particleSystem1.start();
		
		this.scene.registerBeforeRender(() =>{
			if(this.timer1 < 300){
				this.timer1 += 0.15;
			} else {
				particleSystem1.stop();
			}
		});
	}	
}