import Checker from "@/components/checker";
import { HowTo } from "@/components/how-to";
import { ModeToggle } from "@/components/mode-toggle";
import { GitHubLogoIcon, LinkedInLogoIcon } from "@radix-ui/react-icons"


export default function Home() {
  return (
    <div className="min-h-screen m-4 flex flex-col items-center justify-center font-[family-name:var(--font-geist-sans)]">
      <header className="mb-4 justify-end">
        <ModeToggle />
      </header>
      <HowTo />
      <Checker />
      <footer className="mt-4">
        <div className="flex flex-row items-center justify-center gap-2">
          <p>Made with ☕ by Lucas Guiss Gusmão</p>
          <a href="https://linkedin.com/in/lucasguissgusmao" target="_blank">
            <LinkedInLogoIcon />
          </a>
          <a href="https://github.com/lucasguiss" target="_blank">
            <GitHubLogoIcon />
          </a>
        </div>
      </footer>
    </div>
  );
}