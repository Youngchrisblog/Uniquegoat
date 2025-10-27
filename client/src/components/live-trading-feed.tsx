import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp } from "lucide-react";

interface TradingUpdate {
  id: string;
  trader: string;
  ticker: string;
  profit: string;
  time: string;
}

// Fisher-Yates (Knuth) Shuffle function
function shuffleArray(array: TradingUpdate[]) {
  let currentIndex = array.length, randomIndex;

  // While there remain elements to shuffle...
  while (currentIndex !== 0) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }

  return array;
}

const initialTradingUpdates: TradingUpdate[] = [
  { id: "1", trader: "Alex M.", ticker: "SPY", profit: "+$1,240", time: "28m ago" },
  { id: "2", trader: "Sarah K.", ticker: "NVDA", profit: "+$890", time: "1h 17m ago" },
  { id: "3", trader: "Mike R.", ticker: "TSLA", profit: "+$2,100", time: "42m ago" },
  { id: "4", trader: "Jennifer L.", ticker: "AAPL", profit: "+$650", time: "1h 5m ago" },
  { id: "5", trader: "David P.", ticker: "AMD", profit: "+$1,450", time: "17m ago" },
  { id: "6", trader: "Rachel W.", ticker: "MSFT", profit: "+$980", time: "1h 38m ago" },
  { id: "7", trader: "Chris T.", ticker: "META", profit: "+$1,720", time: "2h 0m ago" },
  { id: "8", trader: "Amanda H.", ticker: "GOOGL", profit: "+$840", time: "10m ago" },
  { id: "9", trader: "Kevin N.", ticker: "SPY", profit: "+$1,580", time: "55m ago" },
  { id: "10", trader: "Lisa B.", ticker: "QQQ", profit: "+$925", time: "1h 29m ago" },
  { id: "11", trader: "Ethan C.", ticker: "AMZN", profit: "+$730", time: "5m ago" },
  { id: "12", trader: "Olivia G.", ticker: "NFLX", profit: "+$1,190", time: "1h 4m ago" },
  { id: "13", trader: "Ryan F.", ticker: "SPY", profit: "+$2,510", time: "23m ago" },
  { id: "14", trader: "Chloe D.", ticker: "PLTR", profit: "+$580", time: "1h 58m ago" },
  { id: "15", trader: "Jacob S.", ticker: "TSLA", profit: "+$1,950", time: "1h 55m ago" },
  { id: "16", trader: "Mia J.", ticker: "AAPL", profit: "+$1,010", time: "37m ago" },
  { id: "17", trader: "Daniel K.", ticker: "JPM", profit: "+$430", time: "1h 2m ago" },
  { id: "18", trader: "Sophie A.", ticker: "NVDA", profit: "+$3,200", time: "1h 50m ago" },
  { id: "19", trader: "William B.", ticker: "MSFT", profit: "+$1,370", time: "1h 10m ago" },
  { id: "20", trader: "Eva Z.", ticker: "GOOGL", profit: "+$760", time: "14m ago" },
  { id: "21", trader: "Lucas P.", ticker: "SPY", profit: "+$1,650", time: "49m ago" },
  { id: "22", trader: "Hannah Q.", ticker: "QQQ", profit: "+$1,220", time: "1h 11m ago" },
  { id: "23", trader: "Noah V.", ticker: "AMZN", profit: "+$990", time: "1h 34m ago" },
  { id: "24", trader: "Zoe X.", ticker: "META", profit: "+$1,880", time: "1h 19m ago" },
  { id: "25", trader: "Jack L.", ticker: "AMD", profit: "+$710", time: "30m ago" },
  { id: "26", trader: "Ella M.", ticker: "BAC", profit: "+$350", time: "1h 14m ago" },
  { id: "27", trader: "Mason O.", ticker: "TSLA", profit: "+$2,850", time: "1h 3m ago" },
  { id: "28", trader: "Grace R.", ticker: "NVDA", profit: "+$6,020", time: "1h 56m ago" },
  { id: "29", trader: "Liam S.", ticker: "AAPL", profit: "+$1,120", time: "1h 45m ago" },
  { id: "30", trader: "Avery T.", ticker: "MSFT", profit: "+$590", time: "2h 0m ago" },
  { id: "31", trader: "Owen U.", ticker: "SPY", profit: "+$1,770", time: "9m ago" },
  { id: "32", trader: "Scarlett V.", ticker: "QQQ", profit: "+$810", time: "1h 5m ago" },
  { id: "33", trader: "Henry W.", ticker: "AMZN", profit: "+$1,340", time: "1h 22m ago" },
  { id: "34", trader: "Isabel Y.", ticker: "COIN", profit: "+$950", time: "51m ago" },
  { id: "35", trader: "Leo Z.", ticker: "AMD", profit: "+$1,050", time: "1h 35m ago" },
  { id: "36", trader: "Julia A.", ticker: "GOOGL", profit: "+$680", time: "32m ago" },
  { id: "37", trader: "Andrew C.", ticker: "TSLA", profit: "+$2,280", time: "1h 12m ago" },
  { id: "38", trader: "Penelope E.", ticker: "META", profit: "+$1,550", time: "1h 41m ago" },
  { id: "39", trader: "Sam H.", ticker: "NVDA", profit: "+$4,100", time: "1h 5m ago" },
  { id: "40", trader: "Victoria I.", ticker: "SPY", profit: "+$1,420", time: "1h 3m ago" },
  { id: "41", trader: "Caleb J.", ticker: "JPM", profit: "+$510", time: "2h 0m ago" },
  { id: "42", trader: "Nora L.", ticker: "AAPL", profit: "+$770", time: "1h 31m ago" },
  { id: "43", trader: "Gabriel M.", ticker: "AMD", profit: "+$1,810", time: "44m ago" },
  { id: "44", trader: "Hazel N.", ticker: "MSFT", profit: "+$1,140", time: "1h 51m ago" },
  { id: "45", trader: "Miles O.", ticker: "QQQ", profit: "+$1,690", time: "1h 15m ago" },
  { id: "46", trader: "Ivy P.", ticker: "AMZN", profit: "+$820", time: "19m ago" },
  { id: "47", trader: "Max Q.", ticker: "SPY", profit: "+$2,050", time: "1h 39m ago" },
  { id: "48", trader: "Ruby R.", ticker: "TSLA", profit: "+$3,040", time: "59m ago" },
  { id: "49", trader: "Leo S.", ticker: "COIN", profit: "+$690", time: "1h 48m ago" },
  { id: "50", trader: "Stella T.", ticker: "GOOGL", profit: "+$940", time: "28m ago" },
  { id: "51", trader: "Aaron U.", ticker: "META", profit: "+$1,260", time: "1h 26m ago" },
  { id: "52", trader: "Bella V.", ticker: "NVDA", profit: "+$5,350", time: "1h 5m ago" },
  { id: "53", "trader": "Cole W.", "ticker": "AAPL", "profit": "+$910", "time": "21m ago" },
  { id: "54", "trader": "Daisy X.", "ticker": "AMD", "profit": "+$1,100", "time": "1h 17m ago" },
  { id: "55", "trader": "Finn Y.", "ticker": "MSFT", "profit": "+$620", "time": "1h 55m ago" },
  { id: "56", "trader": "Gemma Z.", "ticker": "SPY", "profit": "+$1,390", "time": "1h 33m ago" },
  { id: "57", "trader": "Holly A.", "ticker": "QQQ", "profit": "+$1,080", "time": "3m ago" },
  { id: "58", "trader": "Izaac B.", "ticker": "AMZN", "profit": "+$740", "time": "1h 21m ago" },
  { id: "59", "trader": "Jasmine C.", "ticker": "PLTR", "profit": "+$490", "time": "1h 57m ago" },
  { id: "60", "trader": "Kian D.", ticker: "TSLA", "profit": "+$1,610", time: "1h 10m ago" },
  { id: "61", "trader": "Lila E.", ticker: "JPM", "profit": "+$380", time: "39m ago" },
  { id: "62", "trader": "Milo F.", ticker: "NVDA", "profit": "+$3,950", time: "1h 45m ago" },
  { id: "63", "trader": "Nina G.", ticker: "GOOGL", "profit": "+$800", time: "1h 14m ago" },
  { id: "64", "trader": "Oscar H.", ticker: "AAPL", "profit": "+$1,290", time: "2h 0m ago" },
  { id: "65", "trader": "Poppy I.", ticker: "META", "profit": "+$1,480", time: "1h 37m ago" },
  { id: "66", "trader": "Quinn J.", ticker: "SPY", "profit": "+$1,790", time: "1h 25m ago" },
  { id: "67", "trader": "Riley K.", ticker: "AMD", "profit": "+$960", time: "1h 52m ago" },
  { id: "68", "trader": "Theo L.", ticker: "MSFT", "profit": "+$1,540", time: "1h 2m ago" },
  { id: "69", "trader": "Ursula M.", ticker: "BAC", "profit": "+$410", time: "28m ago" },
  { id: "70", "trader": "Victor N.", ticker: "QQQ", "profit": "+$1,330", time: "1h 11m ago" },
  { id: "71", "trader": "Willow O.", ticker: "TSLA", "profit": "+$2,600", time: "56m ago" },
  { id: "72", "trader": "Xavier P.", "ticker": "NVDA", "profit": "+$5,910", "time": "1h 39m ago" },
  { id: "73", "trader": "Yara Q.", "ticker": "AAPL", "profit": "+$850", "time": "1h 34m ago" },
  { id: "74", "trader": "Zane R.", "ticker": "GOOGL", "profit": "+$1,070", "time": "1h 2m ago" },
  { id: "75", "trader": "Alia S.", ticker: "AMZN", "profit": "+$1,170", time: "1h 46m ago" },
  { id: "76", "trader": "Ben T.", ticker: "SPY", "profit": "+$1,990", time: "2h 0m ago" },
  { id: "77", "trader": "Cara U.", ticker: "META", "profit": "+$1,670", time: "49m ago" },
  { id: "78", "trader": "Drew V.", ticker: "AMD", "profit": "+$1,530", time: "1h 16m ago" },
  { id: "79", "trader": "Erin W.", ticker: "COIN", "profit": "+$790", time: "1h 5m ago" },
  { id: "80", "trader": "Frank X.", ticker: "MSFT", "profit": "+$930", time: "1h 22m ago" },
  { id: "81", "trader": "Gina Y.", ticker: "TSLA", "profit": "+$3,150", time: "1h 58m ago" },
  { id: "82", "trader": "Hugh Z.", ticker: "QQQ", "profit": "+$1,110", "time": "9m ago" },
  { id: "83", "trader": "Isha A.", ticker: "NVDA", "profit": "+$4,880", "time": "1h 33m ago" },
  { id: "84", "trader": "Jaden B.", ticker: "AAPL", "profit": "+$550", "time": "1h 29m ago" },
  { id: "85", "trader": "Kira C.", ticker: "SPY", "profit": "+$1,490", "time": "1h 51m ago" },
  { id: "86", "trader": "Lane D.", ticker: "AMZN", "profit": "+$1,020", "time": "18m ago" },
  { id: "87", "trader": "Mona E.", ticker: "PLTR", "profit": "+$750", "time": "1h 45m ago" },
  { id: "88", "trader": "Neil F.", ticker: "GOOGL", "profit": "+$1,210", "time": "1h 19m ago" },
  { id: "89", "trader": "Oona G.", ticker: "AMD", "profit": "+$1,300", "time": "1h 5m ago" },
  { id: "90", "trader": "Paul H.", ticker: "MSFT", "profit": "+$870", "time": "1h 56m ago" },
  { id: "91", "trader": "Quinn I.", ticker: "TSLA", "profit": "+$2,430", time: "32m ago" },
  { id: "92", "trader": "Rhea J.", ticker: "META", "profit": "+$1,160", time: "1h 2m ago" },
  { id: "93", "trader": "Seth K.", ticker: "SPY", "profit": "+$1,850", time: "1h 23m ago" },
  { id: "94", "trader": "Talia L.", ticker: "NVDA", "profit": "+$5,080", time: "47m ago" },
  { id: "95", "trader": "Uma M.", "ticker": "AAPL", "profit": "+$990", "time": "1h 39m ago" },
  { id: "96", "trader": "Vance N.", "ticker": "QQQ", "profit": "+$1,410", "time": "1h 3m ago" },
  { id: "97", "trader": "Wendy O.", "ticker": "AMZN", "profit": "+$880", "time": "1h 17m ago" },
  { id: "98", "trader": "Xena P.", "ticker": "AMD", "profit": "+$1,690", "time": "1h 48m ago" },
  { id: "99", "trader": "Yusuf Q.", "ticker": "GOOGL", "profit": "+$700", "time": "1h 46m ago" },
  { id: "100", "trader": "Zia R.", "ticker": "MSFT", "profit": "+$1,030", "time": "2h 0m ago" },
  { id: "101", "trader": "Alvin T.", ticker: "SPY", profit: "+$2,150", time: "1h 3m ago" },
  { id: "102", trader: "Brenda U.", ticker: "QQQ", profit: "+$1,040", time: "1h 36m ago" },
  { id: "103", trader: "Cody V.", ticker: "TSLA", profit: "+$2,760", time: "58m ago" },
  { id: "104", trader: "Dana W.", ticker: "NVDA", profit: "+$6,110", time: "1h 5m ago" },
  { id: "105", trader: "Eli Y.", ticker: "AAPL", profit: "+$780", time: "9m ago" },
  { id: "106", trader: "Fiona Z.", ticker: "AMD", profit: "+$1,590", time: "1h 15m ago" },
  { id: "107", trader: "Gary A.", ticker: "META", profit: "+$1,830", time: "1h 55m ago" },
  { id: "108", trader: "Heidi B.", ticker: "JPM", profit: "+$630", time: "42m ago" },
  { id: "109", trader: "Ian C.", ticker: "SPY", profit: "+$1,360", time: "1h 33m ago" },
  { id: "110", trader: "Jada D.", ticker: "GOOGL", profit: "+$900", time: "1h 52m ago" },
  { id: "111", trader: "Kyle E.", ticker: "AMZN", profit: "+$1,280", time: "12m ago" },
  { id: "112", trader: "Lana F.", ticker: "MSFT", profit: "+$1,090", time: "1h 41m ago" },
  { id: "113", trader: "Mark G.", ticker: "PLTR", profit: "+$670", time: "1h 17m ago" },
  { id: "114", trader: "Nia H.", ticker: "TSLA", profit: "+$3,400", time: "50m ago" },
  { id: "115", trader: "Omar I.", ticker: "NVDA", profit: "+$4,650", time: "1h 37m ago" },
  { id: "116", trader: "Patty J.", ticker: "QQQ", profit: "+$1,180", time: "1h 12m ago" },
  { id: "117", trader: "Quentin K.", ticker: "AAPL", profit: "+$720", time: "1h 48m ago" },
  { id: "118", trader: "Renee L.", ticker: "AMD", profit: "+$1,910", time: "19m ago" },
  { id: "119", trader: "Scott M.", ticker: "SPY", profit: "+$2,330", time: "1h 14m ago" },
  { id: "120", trader: "Tess N.", ticker: "META", profit: "+$1,440", time: "2h 0m ago" },
  { id: "121", trader: "Umar O.", ticker: "COIN", profit: "+$830", time: "1h 31m ago" },
  { id: "122", trader: "Vera P.", ticker: "GOOGL", profit: "+$1,010", time: "30m ago" },
  { id: "123", trader: "Will Q.", ticker: "AMZN", profit: "+$960", time: "1h 45m ago" },
  { id: "124", trader: "Yasmine R.", ticker: "MSFT", profit: "+$680", time: "1h 50m ago" },
  { id: "125", trader: "Zack S.", ticker: "BAC", profit: "+$460", time: "1h 26m ago" },
  { id: "126", trader: "Amy T.", ticker: "TSLA", profit: "+$2,080", time: "1h 3m ago" },
  { id: "127", trader: "Ben U.", ticker: "NVDA", profit: "+$5,550", time: "1h 19m ago" },
  { id: "128", trader: "Cara V.", ticker: "SPY", profit: "+$1,880", time: "23m ago" },
  { id: "129", trader: "Dean W.", ticker: "AAPL", profit: "+$1,430", time: "1h 56m ago" },
  { id: "130", trader: "Elle X.", ticker: "QQQ", profit: "+$990", time: "49m ago" },
  { id: "131", trader: "Flynn Y.", ticker: "AMD", profit: "+$1,270", time: "1h 38m ago" },
  { id: "132", trader: "Gia Z.", ticker: "META", profit: "+$1,940", time: "1h 58m ago" },
  { id: "133", trader: "Hank A.", ticker: "JPM", profit: "+$540", time: "1h 43m ago" },
  { id: "134", trader: "Iris B.", ticker: "AMZN", profit: "+$860", time: "1h 33m ago" },
  { id: "135", trader: "Jace C.", ticker: "TSLA", profit: "+$3,090", time: "51m ago" },
  { id: "136", trader: "Kylie D.", ticker: "GOOGL", profit: "+$750", time: "1h 5m ago" },
  { id: "137", trader: "Leo E.", ticker: "NVDA", profit: "+$4,330", time: "1h 2m ago" },
  { id: "138", trader: "Mina F.", ticker: "SPY", profit: "+$1,560", time: "9m ago" },
  { id: "139", trader: "Nick G.", ticker: "AAPL", profit: "+$1,060", time: "1h 22m ago" },
  { id: "140", trader: "Opal H.", ticker: "MSFT", profit: "+$1,250", time: "2h 0m ago" },
  { id: "141", trader: "Pete I.", ticker: "QQQ", profit: "+$1,570", time: "14m ago" },
  { id: "142", trader: "Ria J.", ticker: "AMD", profit: "+$1,660", time: "1h 55m ago" },
  { id: "143", trader: "Seth K.", ticker: "META", profit: "+$1,310", time: "1h 34m ago" },
  { id: "144", trader: "Tia L.", ticker: "PLTR", profit: "+$610", time: "1h 39m ago" },
  { id: "145", trader: "Uriel M.", ticker: "TSLA", profit: "+$2,980", time: "37m ago" },
  { id: "146", trader: "Vicki N.", ticker: "NVDA", profit: "+$5,180", time: "1h 50m ago" },
  { id: "147", trader: "Wyatt O.", ticker: "AMZN", profit: "+$780", time: "1h 29m ago" },
  { id: "148", trader: "Yuna P.", ticker: "GOOGL", profit: "+$920", time: "1h 51m ago" },
  { id: "149", trader: "Zane Q.", ticker: "SPY", profit: "+$2,210", time: "44m ago" },
  { id: "150", trader: "Alice R.", ticker: "AAPL", profit: "+$690", time: "1h 11m ago" },
  { id: "151", trader: "Bryan S.", ticker: "MSFT", profit: "+$1,110", time: "1h 25m ago" },
  { id: "152", trader: "Chloe T.", ticker: "AMD", profit: "+$1,380", time: "1h 37m ago" },
  { id: "153", trader: "Dale U.", ticker: "QQQ", profit: "+$1,050", time: "5m ago" },
  { id: "154", trader: "Ella V.", ticker: "META", profit: "+$1,740", time: "1h 5m ago" },
  { id: "155", trader: "Fred W.", ticker: "JPM", profit: "+$480", time: "1h 17m ago" },
  { id: "156", trader: "Gwen X.", ticker: "NVDA", profit: "+$4,030", time: "23m ago" },
  { id: "157", trader: "Hank Y.", ticker: "TSLA", profit: "+$2,390", time: "1h 58m ago" },
  { id: "158", trader: "Iris Z.", ticker: "SPY", profit: "+$1,620", time: "1h 2m ago" },
  { id: "159", trader: "Jack A.", ticker: "COIN", profit: "+$520", time: "10m ago" },
  { id: "160", trader: "Kate B.", ticker: "GOOGL", profit: "+$810", time: "1h 45m ago" },
  { id: "161", trader: "Liam C.", ticker: "AMZN", profit: "+$1,550", time: "1h 52m ago" },
  { id: "162", trader: "Molly D.", ticker: "MSFT", profit: "+$1,460", time: "1h 33m ago" },
  { id: "163", trader: "Nick E.", ticker: "AAPL", profit: "+$1,200", time: "1h 38m ago" },
  { id: "164", trader: "Ollie F.", ticker: "AMD", profit: "+$1,780", time: "1h 55m ago" },
  { id: "165", trader: "Piper G.", ticker: "QQQ", profit: "+$1,190", time: "1h 41m ago" },
  { id: "166", trader: "Quentin H.", ticker: "META", profit: "+$1,980", time: "28m ago" },
  { id: "167", trader: "Rose I.", ticker: "SPY", profit: "+$2,450", time: "1h 15m ago" },
  { id: "168", trader: "Sam J.", ticker: "NVDA", profit: "+$6,230", time: "1h 48m ago" },
  { id: "169", trader: "Tara K.", ticker: "TSLA", profit: "+$3,610", time: "1h 3m ago" },
  { id: "170", trader: "Uri L.", ticker: "GOOGL", profit: "+$980", time: "1h 22m ago" },
  { id: "171", trader: "Viv M.", ticker: "AMZN", profit: "+$1,080", time: "2h 0m ago" },
  { id: "172", trader: "Will N.", ticker: "AAPL", profit: "+$820", time: "1h 29m ago" },
  { id: "173", trader: "Xena O.", ticker: "AMD", profit: "+$1,420", time: "1h 56m ago" },
  { id: "174", trader: "Yuri P.", ticker: "MSFT", profit: "+$770", time: "1h 21m ago" },
  { id: "175", trader: "Zia Q.", ticker: "BAC", profit: "+$390", time: "1h 43m ago" },
  { id: "176", trader: "Adam R.", ticker: "SPY", profit: "+$1,920", time: "55m ago" },
  { id: "177", trader: "Beth S.", ticker: "QQQ", profit: "+$1,260", time: "1h 51m ago" },
  { id: "178", trader: "Cain T.", ticker: "META", profit: "+$1,510", time: "1h 39m ago" },
  { id: "179", trader: "Dory U.", ticker: "PLTR", profit: "+$570", time: "1h 31m ago" },
  { id: "180", trader: "Evan V.", ticker: "NVDA", profit: "+$5,780", time: "1h 34m ago" },
  { id: "181", trader: "Faye W.", ticker: "TSLA", profit: "+$2,690", time: "1h 16m ago" },
  { id: "182", trader: "Gabe X.", ticker: "AAPL", profit: "+$1,100", time: "19m ago" },
  { id: "183", trader: "Hope Y.", ticker: "AMZN", profit: "+$940", time: "1h 10m ago" },
  { id: "184", trader: "Ike Z.", ticker: "AMD", profit: "+$1,840", time: "42m ago" },
  { id: "185", trader: "Jade A.", ticker: "GOOGL", profit: "+$1,150", time: "2h 0m ago" },
  { id: "186", trader: "Ken B.", ticker: "MSFT", profit: "+$1,010", time: "37m ago" },
  { id: "187", trader: "Lara C.", ticker: "SPY", profit: "+$1,550", time: "1h 3m ago" },
  { id: "188", trader: "Max D.", ticker: "COIN", profit: "+$660", time: "1h 46m ago" },
  { id: "189", trader: "Nina E.", ticker: "QQQ", profit: "+$1,370", time: "23m ago" },
  { id: "190", trader: "Omar F.", ticker: "TSLA", profit: "+$3,290", time: "1h 50m ago" },
  { id: "191", trader: "Phoebe G.", ticker: "NVDA", profit: "+$4,930", time: "1h 55m ago" },
  { id: "192", trader: "Quinn H.", ticker: "AAPL", profit: "+$740", time: "1h 38m ago" },
  { id: "193", "trader": "Ryan I.", "ticker": "META", "profit": "+$1,400", "time": "10m ago" },
  { id: "194", "trader": "Sara J.", "ticker": "AMD", "profit": "+$1,180", "time": "59m ago" },
  { id: "195", "trader": "Tom K.", "ticker": "JPM", "profit": "+$500", "time": "1h 4m ago" },
  { id: "196", "trader": "Uma L.", "ticker": "GOOGL", "profit": "+$950", "time": "49m ago" },
  { id: "197", "trader": "Vince M.", "ticker": "SPY", "profit": "+$2,010", "time": "1h 52m ago" },
  { id: "198", "trader": "Wren N.", "ticker": "MSFT", "profit": "+$1,290", "time": "28m ago" },
  { id: "199", "trader": "Yogi O.", "ticker": "AMZN", "profit": "+$1,060", "time": "1h 2m ago" },
  { id: "200", "trader": "Zara P.", "ticker": "TSLA", "profit": "+$2,800", "time": "1h 17m ago" },
];

// Shuffle the array
const tradingUpdates = shuffleArray([...initialTradingUpdates]); // Use spread operator to avoid modifying the original

export function LiveTradingFeed() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % tradingUpdates.length);
    }, 3000); // Change every 3 seconds

    return () => clearInterval(interval);
  }, []);

  // Ensure tradingUpdates is not empty before accessing
  if (tradingUpdates.length === 0) {
    return null; // Or return some loading state
  }

  const currentUpdate = tradingUpdates[currentIndex];

  return (
    <Card className="border-primary/50 bg-gradient-to-r from-primary/10 to-secondary/10 p-4 animate-glow-pulse" data-testid="card-live-trading-feed">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Badge variant="destructive" className="animate-pulse" data-testid="badge-live">
            <span className="w-2 h-2 bg-white rounded-full mr-2 animate-ping inline-block" />
            LIVE
          </Badge>
          <TrendingUp className="w-5 h-5 text-primary" />
        </div>
        <p className="text-xs text-muted-foreground">{currentUpdate.time}</p>
      </div>
      <div className="mt-3 flex items-center justify-between">
        <div>
          <p className="text-sm text-muted-foreground">{currentUpdate.trader} just closed</p>
          <p className="text-xl font-bold">
            <span className="text-primary">{currentUpdate.ticker}</span> options
          </p>
        </div>
        <div className="text-right">
          <p className="text-2xl font-black text-green-500" data-testid="text-live-profit">
            {currentUpdate.profit}
          </p>
          <p className="text-xs text-muted-foreground">Profit</p>
        </div>
      </div>
    </Card>
  );
}
