// const synth = new Tone.Synth().toDestination()
// // use an array of objects as long as the object has a "time" attribute
// const part = new Tone.Part(
//   (time, value) => {
//     // the value is an object which contains both the note and the velocity
//     synth.triggerAttackRelease(value.note, '8n', time, value.velocity) //(音符，音符持续时间-4n：四分音符；8n-八分音符，播放的时间点，播放速度)
//   },
//   [
//     { time: 0, note: 'C3', velocity: 1 },
//     { time: '0:4', note: 'C4', velocity: 1 },
//     { time: '0:6', note: 'A4', velocity: 1 },
//   ],
// ).start(0)
//播放 Transport:音频的排列视图
// Tone.Transport.start()

// const synth = new Tone.PolySynth(Tone.Synth).toDestination();
// const now = Tone.now()
// synth.triggerAttack("D4", now);
// synth.triggerAttack("F4", now + 0.5);
// synth.triggerAttack("A4", now + 1);
// synth.triggerAttack("C5", now + 1.5);
// synth.triggerAttack("E5", now + 2);
// synth.triggerRelease(["D4", "F4", "A4", "C5", "E5"], now + 4);

// create two monophonic synths
// const synthA = new Tone.FMSynth().toDestination()
// const synthB = new Tone.AMSynth().toDestination()
// //play a note every quarter-note
// const loopA = new Tone.Loop((time) => {
//   synthA.triggerAttackRelease('C2', '8n', time)
// }, '4n').start(0)
// //play another note every off quarter-note, by starting it "8n"
// const loopB = new Tone.Loop((time) => {
//   synthB.triggerAttackRelease('C4', '8n', time)
// }, '4n').start('8n')
// // the loops start when the Transport is started
// Tone.Transport.start()
// // ramp up to 800 bpm over 10 seconds
// const now = Tone.now()
// const sampler = new Tone.Sampler({
//   urls: {
//     C4: 'C4.mp3',
//     'D#4': 'Ds4.mp3',
//     'F#4': 'Fs4.mp3',
//     A4: 'A4.mp3',
//     A6: 'A6.mp3',
//   },
//   release: 1,
//   baseUrl: 'assets/audio/woodwind/',
// }).toDestination()

// Tone.loaded().then(() => {
//   sampler.triggerAttackRelease(["A6"], 4);
// })

// const part = new Tone.Loop((time) => {
//   sampler.triggerAttackRelease(['C5','F4','D4'], now+4)
// }, '4n').start(now)
// const part2 = new Tone.Loop((time) => {
//   sampler.triggerAttackRelease(['A4','E5'], now+6)
// }, '4n').start(now+2)

// const part = new Tone.Part(
//   (time, value) => {
//     // the value is an object which contains both the note and the velocity
//     sampler.triggerAttackRelease(value.note, value.duration, value.time, 1) //(音符，音符持续时间-4n：四分音符；8n-八分音符，播放的时间点，播放速度)
//   },
//   [
//     { time: '0', duration: '4n', note: 'E4' },
//     { time: '4n', duration: '4n', note: 'E4' },
//     // { time: '4n', duration: '4n', note: 'A4' },
//     { time: '2n', duration: '4n', note: 'F4' },
//     { time: '2n + 4n', duration: '4n', note: 'G4' },
//   ],
// ).start()

// Tone.Transport.bpm.value = 120
// var synth = new Tone.Synth().toMaster()
// // Tone.Transport.bpm.value = 120

// synth.triggerAttackRelease('E4', '4n', '0', 1)
// synth.triggerAttackRelease('E4', '4n', '4n', 1)
// synth.triggerAttackRelease('F4', '4n', '2n', 1)
// synth.triggerAttackRelease('G4', '4n', '1n', 1)

// Tone.Transport.start()
// Tone.Transport.loop()
// Tone.Transport.bpm.rampTo(800, 10);
