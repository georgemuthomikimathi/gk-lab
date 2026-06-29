//+------------------------------------------------------------------+
//|                        BTC_DailyTrendSwing_EA.mq5               |
//|            Trend + Swing Trader — Daily BTC/USD (BTCUSD)        |
//|            Logic: 2-bar pattern → Trend OR Swing entry          |
//+------------------------------------------------------------------+
#property copyright   "Custom EA"
#property version     "1.10"
#property strict

#include <Trade\Trade.mqh>

//--- Input Parameters
input group "=== Trade Mode ==="
input bool   InpEnableTrend  = true;     // Enable Trend-Following trades
input bool   InpEnableSwing  = true;     // Enable Swing (Counter-Trend) trades

input group "=== Trade Settings ==="
input double InpLotSize      = 0.01;     // Lot Size
input double InpTPPercent    = 0.70;     // Take Profit % of previous bar range (e.g. 0.70 = 70%)
input int    InpMagicNumber  = 202501;   // Magic Number

input group "=== Symbol ==="
input string InpSymbol       = "BTCUSD"; // Symbol (BTC/USD)

//--- Global objects
CTrade trade;

//+------------------------------------------------------------------+
//| Expert initialization                                            |
//+------------------------------------------------------------------+
int OnInit()
{
   trade.SetExpertMagicNumber(InpMagicNumber);
   trade.SetDeviationInPoints(50);
   trade.SetTypeFilling(ORDER_FILLING_IOC);

   Print("=== BTC Daily Trend+Swing EA Initialized ===");
   Print("Symbol: ", InpSymbol);
   Print("Trend mode: ", InpEnableTrend ? "ON" : "OFF");
   Print("Swing mode: ", InpEnableSwing ? "ON" : "OFF");
   Print("Lot Size: ", InpLotSize);
   Print("TP %: ", InpTPPercent * 100, "%");

   return INIT_SUCCEEDED;
}

//+------------------------------------------------------------------+
//| Expert deinitialization                                          |
//+------------------------------------------------------------------+
void OnDeinit(const int reason)
{
   Print("EA deinitialized. Reason: ", reason);
}

//+------------------------------------------------------------------+
//| Expert tick function — fires on every new tick                   |
//+------------------------------------------------------------------+
void OnTick()
{
   // Only act on a new Daily bar open
   static datetime lastBarTime = 0;
   datetime currentBarTime = iTime(InpSymbol, PERIOD_D1, 0);

   if(currentBarTime == lastBarTime)
      return; // Same bar, skip

   lastBarTime = currentBarTime;

   // --- Fetch the 2 previous completed daily bars ---
   // Bar[1] = most recent completed bar (prev bar)
   // Bar[2] = the bar before that
   double bar1Open  = iOpen (InpSymbol, PERIOD_D1, 1);
   double bar1Close = iClose(InpSymbol, PERIOD_D1, 1);
   double bar1High  = iHigh (InpSymbol, PERIOD_D1, 1);
   double bar1Low   = iLow  (InpSymbol, PERIOD_D1, 1);

   double bar2Open  = iOpen (InpSymbol, PERIOD_D1, 2);
   double bar2Close = iClose(InpSymbol, PERIOD_D1, 2);

   if(bar1Open == 0 || bar2Open == 0)
   {
      Print("Warning: Could not fetch bar data for ", InpSymbol);
      return;
   }

   // --- Classify bars ---
   bool bar1Bullish = (bar1Close > bar1Open);
   bool bar1Bearish = (bar1Close < bar1Open);
   bool bar2Bullish = (bar2Close > bar2Open);
   bool bar2Bearish = (bar2Close < bar2Open);

   double bar1Range = bar1High - bar1Low;

   if(bar1Range <= 0)
   {
      Print("Bar 1 range is zero — doji/flat bar, skipping.");
      return;
   }

   // --- Skip if we already have an open position for this symbol ---
   if(HasOpenPosition(InpSymbol))
   {
      Print("Position already open for ", InpSymbol, " — skipping new entry.");
      return;
   }

   double askPrice = SymbolInfoDouble(InpSymbol, SYMBOL_ASK);
   double bidPrice = SymbolInfoDouble(InpSymbol, SYMBOL_BID);

   PrintFormat("Bar[-2]: %s | Bar[-1]: %s | Range: %.2f",
               bar2Bullish ? "BULL" : "BEAR",
               bar1Bullish ? "BULL" : "BEAR",
               bar1Range);

   // ================================================================
   //  TREND-FOLLOWING LOGIC
   //  2 Bearish bars  → SELL,  TP = bar1High - (range * 0.70)
   //  2 Bullish bars  → BUY,   TP = bar1Low  + (range * 0.70)
   // ================================================================
   if(InpEnableTrend)
   {
      // TREND SELL: both bars bearish
      if(bar1Bearish && bar2Bearish)
      {
         double tpPrice = bar1High - (bar1Range * InpTPPercent);
         tpPrice = NormalizeDouble(tpPrice, (int)SymbolInfoInteger(InpSymbol, SYMBOL_DIGITS));

         Print(">>> TREND SELL signal | Entry: ", bidPrice, " | TP: ", tpPrice);
         bool result = trade.Sell(InpLotSize, InpSymbol, bidPrice, 0, tpPrice,
                                   "Trend Sell — 2 Bear Bars");
         if(!result)
            Print("Trend SELL order failed. Error: ", GetLastError());
         else
            Print("Trend SELL order placed successfully.");
         return;
      }

      // TREND BUY: both bars bullish
      if(bar1Bullish && bar2Bullish)
      {
         double tpPrice = bar1Low + (bar1Range * InpTPPercent);
         tpPrice = NormalizeDouble(tpPrice, (int)SymbolInfoInteger(InpSymbol, SYMBOL_DIGITS));

         Print(">>> TREND BUY signal | Entry: ", askPrice, " | TP: ", tpPrice);
         bool result = trade.Buy(InpLotSize, InpSymbol, askPrice, 0, tpPrice,
                                  "Trend Buy — 2 Bull Bars");
         if(!result)
            Print("Trend BUY order failed. Error: ", GetLastError());
         else
            Print("Trend BUY order placed successfully.");
         return;
      }
   }

   // ================================================================
   //  SWING (COUNTER-TREND) LOGIC
   //  2 Bullish bars  → SELL (fade), TP = bar1High - (range * 0.70)
   //                    (price expected to retrace 30% from top)
   //  2 Bearish bars  → BUY  (fade), TP = bar1Low  + (range * 0.70)
   //                    (price expected to bounce 70% from low)
   //  No Stop Loss on swing trades
   // ================================================================
   if(InpEnableSwing)
   {
      // SWING SELL: 2 bullish bars — fade the rally
      if(bar1Bullish && bar2Bullish)
      {
         double tpPrice = bar1High - (bar1Range * InpTPPercent);
         tpPrice = NormalizeDouble(tpPrice, (int)SymbolInfoInteger(InpSymbol, SYMBOL_DIGITS));

         Print(">>> SWING SELL signal (fade bull) | Entry: ", bidPrice, " | TP: ", tpPrice, " | No SL");
         bool result = trade.Sell(InpLotSize, InpSymbol, bidPrice, 0, tpPrice,
                                   "Swing Sell — Fade 2 Bull Bars");
         if(!result)
            Print("Swing SELL order failed. Error: ", GetLastError());
         else
            Print("Swing SELL order placed successfully.");
         return;
      }

      // SWING BUY: 2 bearish bars — fade the selloff (long, no SL)
      if(bar1Bearish && bar2Bearish)
      {
         double tpPrice = bar1Low + (bar1Range * InpTPPercent);
         tpPrice = NormalizeDouble(tpPrice, (int)SymbolInfoInteger(InpSymbol, SYMBOL_DIGITS));

         Print(">>> SWING BUY signal (fade bear) | Entry: ", askPrice, " | TP: ", tpPrice, " | No SL");
         bool result = trade.Buy(InpLotSize, InpSymbol, askPrice, 0, tpPrice,
                                  "Swing Buy — Fade 2 Bear Bars");
         if(!result)
            Print("Swing BUY order failed. Error: ", GetLastError());
         else
            Print("Swing BUY order placed successfully.");
         return;
      }
   }

   Print("No signal this bar. Pattern: Bar2=", bar2Bullish ? "BULL" : "BEAR",
         " | Bar1=", bar1Bullish ? "BULL" : "BEAR");
}

//+------------------------------------------------------------------+
//| Helper: Check if a position is already open for this symbol      |
//+------------------------------------------------------------------+
bool HasOpenPosition(string symbol)
{
   for(int i = 0; i < PositionsTotal(); i++)
   {
      ulong ticket = PositionGetTicket(i);
      if(PositionSelectByTicket(ticket))
      {
         if(PositionGetString(POSITION_SYMBOL) == symbol &&
            PositionGetInteger(POSITION_MAGIC) == InpMagicNumber)
            return true;
      }
   }
   return false;
}
//+------------------------------------------------------------------+
