export const SelectBudgetOptions = [
    {
        id:1,
        title:'Cheap',
        desc:'Stay conscious of costs',
        icon:'💵'
    },
    {
        id:2,
        title:'Moderate',
        desc:'Keep cost on the average side',
        icon:'💸'
    },
    {
        id:3,
        title:'Luxury',
        desc:'Don\'t worry about cost',
        icon:'💰'

    }
]

export const SelectTravelList = [
    {
        id:1,
        title:'Just Me',
        desc:'A sole travels in exploration',
        icon:'✈️',
        people:'1'
    },
    {
        id:2,
        title:'Couple',
        desc:'Two travels in tandem',
        icon:'🥂',
        people: ' 2'
    },
    {
        id:3,
        title:'Family',
        desc:'A group of fun loving adventurers',
        icon:'👩‍👩‍👦',
        people: '3 to 5 people '
    },
    {
        id:4,
        title:'Friends',
        desc:'A bunch of thrill-seekers',
        icon:'⛵',
        people: '5 to 10 people'
    }     
    
]
export const AI_PROMPT = 'Generate Travel Plan for location: {location}, for {totalDays} Days for {traveler} with a {budget} budget , give me Hotels options list with Hotelname, Hotel address, Price, hotel image url, geo coordinates, ratings, descriptions and suggest itenary with placeName, Place Details, Place Image Url, Geo Coordinates, ticket Pricing, Time travel each of the location for {totalDays} days with each day plan with best time to visit in JSON format.'