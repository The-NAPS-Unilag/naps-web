// import { useState } from "react";
import "./App.css";
import { Button } from "./components/ui/button";
import { Card, CardContent, CardTitle } from "./components/ui/card";

function App() {
  return (
    <>
      <div>
        <Card className="h-full">
          <div className="relative h-[300px]">
            <img
              src={
                "https://i0.wp.com/www.chronicle.ng/wp-content/uploads/2021/08/UNILAG-University-of-Lagos.jpg"
              }
              alt={"image"}
              className="h-full w-full object-cover"
            />
            <CardContent className="absolute bottom-0 left-0 right-0 bg-white/70 p-4">
              <CardTitle>NAPS</CardTitle>
              <Button
                variant="ghost"
                size="lg"
                onClick={() => alert("This is an alert")}
              >
                Click me
              </Button>
            </CardContent>
          </div>
        </Card>
      </div>
    </>
  );
}

export default App;
