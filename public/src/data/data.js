import ASI_GURI from './asi_guri';
import DANK from './dank';
import COMMERCIALS from './commercials';
import ERETZ_NEHEDERET from './eretz_nehederet';
import GENERAL from './general';
import GOALSTAR from './goalstar';
import ISRAELI from './israeli';
import ISRAELI_TV from './israeli_tv';
import JEWS from './jews';
import MASHUPS from './mashups';
import POP from './pop';
import REALITY from './reality';
import TV_ABROAD from './tv_abroad';
import CLASSIC from './classic'
import ANIMALS from './animals';
import MEDIA from './media';
import PARLAMENT from './parlament';

module.exports =   [
    {type: "dank memes", data : DANK},
    {type: "Classic Memes", data : CLASSIC},
    {type: "Pop culture", data : POP},
    {type: "TV shows", data : TV_ABROAD},
    {type: "Mashups", data : MASHUPS},
    {type: "ממים ישראליים", data : ISRAELI},
    {type: "הפרלמנט", data : PARLAMENT},
    {type: "סדרות ישראליות", data : ISRAELI_TV},
    {type: "חיות", data : ANIMALS},
    {type: "ארץ נהדרת", data : ERETZ_NEHEDERET},
    {type: "ריאליטי", data : REALITY},
    {type: "פרסומות", data : COMMERCIALS},
    {type: "כללי", data : GENERAL},
    {type: "אסי וגורי", data : ASI_GURI},
    {type: "גולסטאר", data : GOALSTAR},
    {type: "מדיה", data : MEDIA},
    {type: "היהודים באים", data : JEWS},
];