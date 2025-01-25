import Background from "@/app/components/Background"
import LeftColumn from "@/app/components/LeftColumn"
import RightColumn from "@/app/components/RightColumn"
import CursorGlow from "./components/CursorGlow"

export default function Home() {
  return (
    <main className="flex min-h-screen">
      <Background />
      <div className="flex w-4/5 z-10 relative">
        <CursorGlow />
        <LeftColumn />
        <RightColumn />
      </div>
    </main>
  )
}

