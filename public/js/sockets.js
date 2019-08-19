
(function initsockets(){
    const socket = io.connect('http://127.0.0.1:9700');

    // image service
    socket.on('image', (frame) => {
        console.log('IMAGE INCOMING')

        const image = document.getElementById('drone-camera');
        image.src = `data:image/jpeg;base64,${frame}`;
    })

    // stats service
    socket.on('stats', (data = {pitch: 'test'} ) => {
        console.log('STATS INCOMING')

        const pitch = document.getElementById('pitch')
        const roll = document.getElementById('roll')
        const yaw = document.getElementById('yaw')
        const height = document.getElementById('height')
        const battery = document.getElementById('battery');
        const batteryLvl = document.getElementById('battery-level');
        const droneAxys = document.getElementById('droneAxys')

        pitch.innerText = `pitch: ${data.pitch}`
        roll.innerText = `roll: ${data.roll}`
        yaw.innerText = `yaw: ${data.yaw}`
        height.innerText = `height: ${data.h}m`

        battery.style.height = `${data.bat}%`;
        battery.style.backgroundColor = data.bat < 50 ? 'orange' : 'green';

        batteryLvl.innerText = `${data.bat}%`;

        droneAxys.style.transform = `rotateX(${data.pitch}deg) rotateY(${data.roll * -1}deg) rotate(${data.yaw * -1}deg)`;

    })

    // commands service
    socket.on('commands', (feedback) => {
        console.log('COMMANDS INCOMING')

    })

    // other service
    socket.on('other', (data) => {
        console.log('OTHER INCOMING')

        const battery = document.getElementById('battery');
        battery.style.height = `${data.energy}%`
        battery.style.backgroundColor = data.energy < 50 ? 'orange' : 'green' 
    })
})()


