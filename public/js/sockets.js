
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

        pitch.innerText = `pitch: ${data.pitch}`
        roll.innerText = `roll: ${data.roll}`
        yaw.innerText = `yaw: ${data.yaw}`
        height.innerText = `height: ${data.h}m`
    })

    // commands service
    socket.on('commands', (feedback) => {
        console.log('COMMANDS INCOMING')

    })

    // other service
    socket.on('other', (data) => {
        console.log('OTHER INCOMING')

    })
})()


