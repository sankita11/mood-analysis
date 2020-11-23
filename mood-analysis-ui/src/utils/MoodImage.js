import mood1 from './static/images/mood/1.png'
import mood2 from './static/images/mood/2.png'
import mood3 from './static/images/mood/3.png'
import mood4 from './static/images/mood/4.png'
import mood5 from './static/images/mood/5.png'
import mood6 from './static/images/mood/6.png'
import mood7 from './static/images/mood/7.png'


const moodMap = {
    1 : mood1,
    2 : mood2,
    3 : mood3,
    4 : mood4, 
    5 : mood5,
    6 : mood6,
    7 : mood7
};

export default function getMoodImage( moodScore ){
    return moodMap[moodScore];
}