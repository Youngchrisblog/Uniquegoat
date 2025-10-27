import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { TrendingUp, Users, DollarSign, Bell } from "lucide-react";

interface Notification {
  id: string;
  type: "trade" | "join" | "profit";
  message: string;
  icon: typeof TrendingUp;
}

// --- START: Notification Generator ---

// Helper function to pick a random item from an array
const randItem = (arr: any[]) => arr[Math.floor(Math.random() * arr.length)];

// Helper function to generate a random number
const randInt = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min;

// Data pools for random generation
const firstNames = [
  "Michael", "Emma", "Brandon", "Marcus", "Jessica", "David", "Ryan", "Tyler", "Ashley",
  "Carlos", "Jordan", "Samantha", "Kevin", "Nicole", "Derek", "Chris", "Melissa", "James",
  "Olivia", "Liam", "Sophia", "Noah", "Ava", "William", "Isabella", "Mason", "Mia", "Ethan",
  "Charlotte", "Logan", "Emily", "Jacob", "Harper", "Daniel", "Evelyn", "Alex", "Abigail",
  "Lucas", "Aiden", "Sarah"
];
const lastInitials = ["A", "B", "C", "D", "E", "F", "G", "H", "J", "K", "L", "M", "N", "P", "R", "S", "T", "W"];
const locations = [
  "Texas", "California", "Florida", "New York", "Georgia", "Arizona", "Illinois",
  "Washington", "Ohio", "Pennsylvania", "Michigan", "Virginia", "North Carolina",
  "Colorado", "New Jersey", "Tennessee", "Mass.", "Nevada", "Oregon", "Utah"
];
const stocks = [
  "SPY", "QQQ", "NVDA", "TSLA", "AMD", "MSFT", "AAPL", "META", "GOOGL", "AMZN",
  "NFLX", "COIN", "MARA", "SMCI", "PLTR", "SOFI", "RIVN", "BA", "DIS", "PYPL"
];

// Generates a single random notification object
const createRandomNotification = (): Omit<Notification, "id"> => {
  const type = randItem(["trade", "join", "profit"]);

  if (type === "join") {
    const name = `${randItem(firstNames)} ${randItem(lastInitials)}.`;
    const location = randItem(locations);
    const action = randItem(["just joined", "became a member", "just subscribed", "joined the group"]);
    return {
      type: "join",
      message: `${name} from ${location} ${action}`,
      icon: Users,
    };
  }

  if (type === "profit") {
    const name = randItem(firstNames);
    const profit = randInt(400, 3500);
    const stock = randItem(stocks);
    const action = randItem(["banked", "closed", "secured", "made", "locked in"]);
    return {
      type: "profit",
      message: `${name} ${action} +$${profit.toLocaleString()} on ${stock}`,
      icon: DollarSign,
    };
  }

  // Otherwise, it's a "trade"
  const stock = randItem(stocks);
  const price = randInt(100, 700);
  const tradeActions = [
    `breaking $${price} resistance - Calls heating up`,
    `reclaiming VWAP on 15min - momentum building`,
    `$${price + 50}C looking prime - volume increasing`,
    `holding key support at $${price - 20} - watching for bounce`,
    `consolidating near $${price} - breakout setup forming`,
    `testing resistance at $${price + 10} - high volume`,
    `$${price - 50}P getting unusual activity - watching closely`,
    `breaking daily high - momentum play active`,
  ];
  return {
    type: "trade",
    message: `${stock} ${randItem(tradeActions)}`,
    icon: randItem([TrendingUp, Bell]), // Randomize trade icon
  };
};

// Create an array of 200 random notifications
const sampleNotifications: Omit<Notification, "id">[] = Array.from(
  { length: 200 },
  createRandomNotification
);

// --- END: Notification Generator ---

export function LiveNotifications() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [visible, setVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    const dismissed = sessionStorage.getItem("notifications-dismissed");
    if (dismissed) {
      setIsDismissed(true);
      return;
    }

    let visibilityTimeout: NodeJS.Timeout | null = null;
    let hideTimeout: NodeJS.Timeout | null = null;

    const showRandomNotification = () => {
      if (isDismissed) return;

      const randomNotif = sampleNotifications[Math.floor(Math.random() * sampleNotifications.length)];
      const newNotification: Notification = {
        id: Date.now().toString(),
        ...randomNotif,
      };

      setNotifications([newNotification]);
      setVisible(true);

      visibilityTimeout = setTimeout(() => {
        setVisible(false);
        hideTimeout = setTimeout(() => setNotifications([]), 500);
      }, 5000);
    };

    // Note: User's original interval was 15000ms. Kept as is.
    const interval = setInterval(showRandomNotification, 15000);
    showRandomNotification(); // Show one immediately on load

    return () => {
      clearInterval(interval);
      if (visibilityTimeout) clearTimeout(visibilityTimeout);
      if (hideTimeout) clearTimeout(hideTimeout);
    };
  }, [isDismissed]);

  const handleDismiss = () => {
    setIsDismissed(true);
    setVisible(false);
    sessionStorage.setItem("notifications-dismissed", "true");
  };

  if (notifications.length === 0 || isDismissed) return null;

  return (
    <div
      className={`fixed top-20 right-6 z-40 max-w-sm transition-all duration-500 ${
        visible ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"
      }`}
    >
      {notifications.map((notif) => {
        const Icon = notif.icon;
        return (
          <Card
            key={notif.id}
            className="p-4 bg-card/95 backdrop-blur-sm border-2 shadow-lg hover-elevate"
            data-testid={`notification-${notif.type}`}
          >
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-full bg-primary/20">
                <Icon className="w-5 h-5 text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2 mb-1">
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary" className="text-xs">
                      {notif.type === "trade" && "Live Trade"}
                      {notif.type === "join" && "New Member"}
                      {notif.type === "profit" && "Profit Alert"}
                    </Badge>
                    <span className="text-xs text-muted-foreground">Just now</span>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-5 w-5 shrink-0"
                    onClick={handleDismiss}
                    data-testid="button-dismiss-notifications"
                  >
                    <span className="text-xs">✕</span>
                  </Button>
                </div>
                <p className="text-sm font-medium leading-tight">{notif.message}</p>
              </div>
            </div>
          </Card>
        );
      })}
    </div>
  );
}
