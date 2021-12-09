const Matter = require('matter-js');

export const slingshotMenu = () => {

  const container = document.getElementById('menu-slingshot');

  var Engine = Matter.Engine,
    Render = Matter.Render,
    Runner = Matter.Runner,
    Composites = Matter.Composites,
    Events = Matter.Events,
    Constraint = Matter.Constraint,
    MouseConstraint = Matter.MouseConstraint,
    Mouse = Matter.Mouse,
    Common = Matter.Common,
    Composite = Matter.Composite,
    Bodies = Matter.Bodies;

  // create engine
  var engine = Engine.create(),
    world = engine.world;

  // create renderer
  var render = Render.create({
    element: document.getElementById('menu-slingshot'),
    engine: engine,
    options: {
      background: 'transparent',
      wireframes: false,
      width: 800,
      height: 350,
      showVelocity: false
    }
  });

  Render.run(render);

  // create runner
  var runner = Runner.create();
  Runner.run(runner, engine);

  // add bodies
  var mathematics = Bodies.rectangle(0, 0, 5000, 10, { isStatic: true, render: { fillStyle: 'transparent' } }),
    rockOptions = { density: 0.004 },
    rock = Bodies.circle(400, 250, 25, rockOptions),
    anchor = { x: 400, y: 250 },
    elastic = Constraint.create({
      pointA: anchor,
      bodyB: rock,
      stiffness: 0.05,
      render: {
        strokeStyle: '#546e7a'
      }
    });

  Composite.add(engine.world, [mathematics, rock, elastic]);

  Events.on(engine, 'afterUpdate', function () {
    if (mouseConstraint.mouse.button === -1 && (rock.position.x > 800 || rock.position.y < 230)) {
      rock = Bodies.circle(400, 250, 25, rockOptions);
      Composite.add(engine.world, rock);
      elastic.bodyB = rock;
    }
  });

  // add mouse control
  var mouse = Mouse.create(render.canvas),
    mouseConstraint = MouseConstraint.create(engine, {
      mouse: mouse,
      constraint: {
        stiffness: 0.2,
        render: {
          visible: false
        }
      }
    });

  Composite.add(world, mouseConstraint);

  // keep the mouse in sync with rendering
  render.mouse = mouse;

  Events.on(engine, 'collisionStart', (event) => {
    event.pairs.forEach(collision => {
      const collidePos = collision.bodyB.position;
      const xPos = Number(collidePos.x);
      const yPos = Number(collidePos.y);
      // Menu 1 collide area
      if (xPos > -300 && xPos < 10 && yPos < 100) {
        document.getElementById('menu-1').classList.add('uk-animation-shake');
        setTimeout(() => {
          window.location.href = '/menu1.html';
        }, 500);
        return;
      }
      // Menu 2 collide area
      if (xPos > 11 && xPos < 100 && yPos < 100) {
        document.getElementById('menu-2').classList.add('uk-animation-shake');
        setTimeout(() => {
          window.location.href = '/menu2.html';
        }, 500);
        return;
      }
      // Menu 3 collide area
      if (xPos > 101 && xPos < 320 && yPos < 100) {
        document.getElementById('menu-3').classList.add('uk-animation-shake');
        setTimeout(() => {
          window.location.href = '/menu3.html';
        }, 500);
        return;
      }
      // Main menu collide area
      if (xPos > 320 && xPos < 470 && yPos < 100) {
        document.getElementById('main-menu').classList.add('uk-animation-shake');
        setTimeout(() => {
          window.location.href = '/';
        }, 500);
        return;
      }
      // Menu 4 collide area
      if (xPos > 510 && xPos < 680 && yPos < 100) {
        document.getElementById('menu-4').classList.add('uk-animation-shake');
        setTimeout(() => {
          window.location.href = '/menu4.html';
        }, 500);
        return;
      }
      // Menu 5 collide area
      if (xPos > 681 && xPos < 880 && yPos < 100) {
        document.getElementById('menu-5').classList.add('uk-animation-shake');
        setTimeout(() => {
          window.location.href = '/menu5.html';
        }, 500);
        return;
      }
      // Menu 6 collide area
      if (xPos > 881 && xPos < 1000 && yPos < 100) {
        document.getElementById('menu-6').classList.add('uk-animation-shake');
        setTimeout(() => {
          window.location.href = '/menu6.html';
        }, 500);
        return;
      }
    })
  });

  // fit the render viewport to the scene
  Render.lookAt(render, {
    min: { x: 0, y: 0 },
    max: { x: 800, y: 600 }
  });

  // context for MatterTools.Demo
  return {
    engine: engine,
    runner: runner,
    render: render,
    canvas: render.canvas,
    stop: function () {
      Matter.Render.stop(render);
      Matter.Runner.stop(runner);
    }
  };
}