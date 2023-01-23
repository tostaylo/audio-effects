# Audio Effects

This project is the start of a guitar effects simulator.  Amps, pedals, and mixing effects will be implemented.  One of the main goals of the project is to decouple the core logic enough to easily port to another audio context environment.

## Running the project

1. `npm install`
2. `npm run prepare`
3. `npm run start` for starting wrangler or `npm run serve` for simple http server
4. `npm run build:dev` in new terminal window

## Deploying

`wrangler publish`

## Public URL

<https://audio-effects.torretaylor.workers.dev/>

## Testing

`npm run test:playwright`
`npm run test:jest`
