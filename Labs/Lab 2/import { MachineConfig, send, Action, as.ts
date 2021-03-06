import { MachineConfig, send, Action, assign } from "xstate";


function say(text: string): Action<SDSContext, SDSEvent> {
    return send((_context: SDSContext) => ({ type: "SPEAK", value: text }))
}

function listen(): Action<SDSContext, SDSEvent> {
    return send("LISTEN")
}

const grammar: { [index: string]: { person?: string, day?: string, time?: string } } = {
    "John": { person: "John Appleseed" },
    "Zhe": { person: "Zhe Han" },
    "Siyi": { person: "Siyi Gu" },
    "Jae Eun": { person: "Jae Eun Hong" },
    "Oreen": { person: "Oreen Yousuf" },
    "Angeliki": { person: "Angeliki Zagoura" },
    "Flor": { person: "Flor Ortiz" },
    "Emma": { person: "Emma Wallerö"},

    "john": { person: "john appleseed" },
    "zhe": { person: "zhe han" },
    "siyi": { person: "siyi gu" },
    "jae eun": { person: "jae eun hong" },
    "oreen": { person: "oreen yousuf" },
    "angeliki": { person: "angeliki zagoura" },
    "flor": { person: "flor ortiz" },
    "emma": { person: "emma wallerö" },

    "Monday": { day: "Monday" },
    "on Monday": { day: "Monday" },
    "Tuesday": { day: "Tuesday" },
    "on Tuesday": { day: "Tuesday" },
    "Wednesday": { day: "Wednesday" },
    "on Wednesday": { day: "Wednesday" },
    "Thursday": { day: "Thursday" },
    "on Thursday": { day: "Thursday" },
    "Friday": { day: "Friday" },
    "on Friday": { day: "Friday" },
    "Saturday": { day: "Saturday" },
    "on Saturday": { day: "Saturday" },
    "Sunday": { day: "Sunday" },
    "on Sunday": { day: "Sunday" },


    "at one": { time: "01:00" },
    "at two": { time: "02:00" },
    "at three": { time: "03:00" },
    "at four": { time: "04:00" },
    "at five": { time: "05:00" },
    "at six": { time: "06:00" },
    "at seven": { time: "07:00" },
    "at eight": { time: "08:00" },
    "at nine": { time: "09:00" },
    "at ten": { time: "10:00" },
    "at eleven": { time: "11:00" },
    "at twelve": { time: "12:00" },
    "at thirteen": { time: "13:00" },
    "at fourteen": { time: "14:00" },
    "at fifteen": { time: "15:00" },
    "at sixteen": { time: "16:00" },
    "at seventeen": { time: "17:00" },
    "at eighteen": { time: "18:00" },
    "at nineteen": { time: "19:00" },
    "at twenty": { time: "20:00" },
    "at twenty one": { time: "21:00" },
    "at twenty two": { time: "22:00" },
    "at twenty three": { time: "23:00" },
    "at twenty four": { time: "00:00" },

    "one": { time: "01:00" },
    "two": { time: "02:00" },
    "three": { time: "03:00" },
    "four": { time: "04:00" },
    "five": { time: "05:00" },
    "six": { time: "06:00" },
    "seven": { time: "07:00" },
    "eight": { time: "08:00" },
    "nine": { time: "09:00" },
    "ten": { time: "10:00" },
    "eleven": { time: "11:00" },
    "twelve": { time: "12:00" },
    "thirteen": { time: "13:00" },
    "fourteen": { time: "14:00" },
    "fifteen": { time: "15:00" },
    "sixteen": { time: "16:00" },
    "seventeen": { time: "17:00" },
    "eighteen": { time: "18:00" },
    "nineteen": { time: "19:00" },
    "twenty": { time: "20:00" },
    "twenty one": { time: "21:00" },
    "twenty two": { time: "22:00" },
    "twenty three": { time: "23:00" },
    "twenty four": { time: "00:00" },

    "at 1": { time: "01:00" },
    "at 2": { time: "02:00" },
    "at 3": { time: "03:00" },
    "at 4": { time: "04:00" },
    "at 5": { time: "05:00" },
    "at 6": { time: "06:00" },
    "at 7": { time: "07:00" },
    "at 8": { time: "08:00" },
    "at 9": { time: "09:00" },
    "at 10": { time: "10:00" },
    "at 11": { time: "11:00" },
    "at 12": { time: "12:00" },
    "at 13": { time: "13:00" },
    "at 14": { time: "14:00" },
    "at 15": { time: "15:00" },
    "at 16": { time: "16:00" },
    "at 17": { time: "17:00" },
    "at 18": { time: "18:00" },
    "at 19": { time: "19:00" },
    "at 20": { time: "20:00" },
    "at 21": { time: "21:00" },
    "at 22": { time: "22:00" },
    "at 23": { time: "23:00" },
    "at 24": { time: "00:00" },

    "1": { time: "01:00" },
    "2": { time: "02:00" },
    "3": { time: "03:00" },
    "4": { time: "04:00" },
    "5": { time: "05:00" },
    "6": { time: "06:00" },
    "7": { time: "07:00" },
    "8": { time: "08:00" },
    "9": { time: "09:00" },
    "10": { time: "10:00" },
    "11": { time: "11:00" },
    "12": { time: "12:00" },
    "13": { time: "13:00" },
    "14": { time: "14:00" },
    "15": { time: "15:00" },
    "16": { time: "16:00" },
    "17": { time: "17:00" },
    "18": { time: "18:00" },
    "19": { time: "19:00" },
    "20": { time: "20:00" },
    "21": { time: "21:00" },
    "22": { time: "22:00" },
    "23": { time: "23:00" },
    "24": { time: "00:00" }
}

const grammar2 = {
    "yes": true,
    "Yes": true,
    "yes of course": true,
    "Yes of course": true,
    "sure": true,
    "Sure": true,
    "absolutely": true,
    "Absolutely": true,
    "perfect": true,
    "Perfect": true,
    "no": false,
    "No": false,
    "no way": false,
    "No way": false
}

export const dmMachine: MachineConfig<SDSContext, any, SDSEvent> = ({
    initial: "init",
    states: 
    {
        init: 
        {
            on: 
            {
                CLICK: "welcome"
            }
        },

        welcome: 
        {
            initial: "prompt",
            on: { ENDSPEECH: "who" },
            states: 
            {
                prompt: { entry: say("Let"s create an appointment") }
            }
        },

        who: 
        {
            initial: "prompt",
            on: 
            {
                RECOGNISED: [{
                    cond: (context) => "person" in (grammar[context.recResult] || {}),
                    actions: assign((context) => { return { person: grammar[context.recResult].person } }),
                    target: "day"

                },
                { target: ".nomatch" }]
            },
            states: 
            {
                prompt: 
                {
                    entry: say("Who are you meeting with?"),
                    on: { ENDSPEECH: "ask" }
                },
                ask: 
                {
                    entry: listen()
                },
                nomatch: 
                {
                    entry: say("Sorry I don"t know them"),
                    on: { ENDSPEECH: "prompt" }
                }
            }
        },

        day: 
        {
            initial: "prompt",
            on: 
            {
	            RECOGNISED: [{
	                cond: (context) => "day" in (grammar[context.recResult] || {}),
		            actions: assign((context) => { return { day: grammar[context.recResult].day } }),
		            target: "wholeday"

		        },	
		        { target: ".nomatch" }]
	        },
            states: 
            {
                prompt: 
                {
                    entry: send((context) => ({
                        type: "SPEAK",
                        value: `OK. ${context.person}. On which day is your meeting?`
                    })),
		            on: { ENDSPEECH: "ask" }
                },
                ask: 
                {
		            entry: listen()
	            },
                nomatch: 
                {
		            entry: say("Sorry I don"t know which day are you talking about"),
		            on: { ENDSPEECH: "prompt" }
	            }	     
            }
        },

        wholeday: 
        {
		    initial: "prompt",
		    on: {
	            RECOGNISED: [{
			        cond: (context) => grammar2[context.recResult] === true,
                    target: "notime"},
					{
					cond: (context) => grammar2[context.recResult] === false,
					target: "whattime"

		        },
	            { target: ".nomatch" }]
		    },
            states: 
            {
                prompt: 
                {
			        entry: send((context) => ({
			            type: "SPEAK",
						value: `Good.on ${context.day}. Will it take the whole day?`
			        })),
			        on: { ENDSPEECH: "ask" }
		        },
                ask: 
                {
		            entry: listen()
		        },
                nomatch: 
                {
			        entry: say("Please repeat it again"),
		            on: { ENDSPEECH: "prompt" }
		        }
		    }	     
        },

        notime: 
        {
		    initial: "prompt",
            on: 
            {
                RECOGNISED: 
                [
                    { 
			            cond: (context) => grammar2[context.recResult] === true,
                        target: "Finished"
                    },

					{
					cond: (context) => grammar2["context.recResult"] === false,
                    target: "who"	   
                    },
                    
                    { target: ".nomatch" }
                ]

		    },
            states: 
            {
                prompt: 
                {
			        entry: send((context) => ({
			            type: "SPEAK",
						value: `Good. Do you want to me create an appointment with ${context.person} on ${context.day}for the whole day?`
                    })),
                    on: { ENDSPEECH: "ask" }
                },
                
                ask: 
                {
			        entry: listen()
                },
                
                nomatch: 
                {
			        entry: say("Please repeat it again"),
			        on: { ENDSPEECH: "prompt" }
		        }
            }
        },
        
        whattime: 
        {
			initial: "prompt",
            on: 
            {
                RECOGNISED: 
                [
                    {
					cond: (context) => "time" in (grammar[context.recResult] || {}),
					actions: assign((context) => { return { time: grammar[context.recResult].time } }),
					target: "withtime"
                    },
                            
                    { target: ".nomatch" }
                ]
            },
                    
            states: 
            {
				prompt: { entry: say("What time is your meeting"),
				on: { ENDSPEECH: "ask" }
            },
                    
                    ask: 
                    {
						entry: listen()
                    },
                    
                nomatch: 
                {
					entry: say("Please repeat it again"),
					on: { ENDSPEECH: "prompt" }
				}
			}
        },
        
        withtime: 
        {
			initial: "prompt",
            on: 
            {
                RECOGNISED: 
                [
                    { 
					cond: (context) => grammar2[context.recResult] === true,
                    target: "Finished"
                    },

					{
					cond: (context) => grammar2[context.recResult] === false,
					target: "who"
                    },
                    
                    { target: ".nomatch" }
                ]
             },
             
             states: 
             {
                 prompt: 
                 {
					 entry: send((context) => ({
						 type: "SPEAK",
						 value: `Good. Do you want to me create an appointment with ${context.person} on ${context.day} at ${context.time}?`
					 })),
					 on: { ENDSPEECH: "ask" }
                 },
                 
                 ask: 
                 {
					 entry: listen()
                 },
                 
                 nomatch: 
                 {
					 entry: say("Please repeat it again"),
					 on: { ENDSPEECH: "prompt" }
				 }
			 }
        },
        
        Finished: 
        {
		    initial: "prompt",
		    on: { ENDSPEECH: "init" },
            states: 
            {
                prompt: 
                { 
                    entry: say("Your appointment has been created!")
		        },
	        }
	    }	    
    }
})