import { Link } from "react-router-dom";
import { Github, Twitter, Globe } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="border-t border-border bg-background mt-auto">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-6 h-6 bg-primary rounded flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-xs">
                  AI
                </span>
              </div>
              <span className="font-bold text-foreground">nest</span>
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Decentralized AI dataset marketplace on StarkNet. Democratizing
              access to high-quality AI training data.
            </p>
          </div>

          {/* Platform */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Platform</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  to="/marketplace"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Browse Datasets
                </Link>
              </li>
              <li>
                <Link
                  to="/upload"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Upload Data
                </Link>
              </li>
              <li>
                <Link
                  to="/docs"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Documentation
                </Link>
              </li>
            </ul>
          </div>

          {/* Community */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Community</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="https://x.com/@AInest01"
                  target="_blank"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  X
                </a>
              </li>
              <li>
                <a
                  href="#"
                  target="_blank"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Discord
                </a>
              </li>
              <li>
                <a
                  href="#"
                  target="_blank"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Telegram
                </a>
              </li>
            </ul>
          </div>

          {/* Developer */}
          {/* <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Developer</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="#"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  API Reference
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Smart Contracts
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  SDK
                </a>
              </li>
            </ul>
          </div> */}
        </div>

        {/* Bottom section */}
        <div className="mt-8 pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <p className="text-muted-foreground text-sm">
            © 2025 AInest. Built on StarkNet.
          </p>

          <div className="flex items-center space-x-4">
            <a
              href="https://github.com/Macnelson9/ainest.git"
              target="_blank"
              className="text-muted-foreground hover:text-foreground transition-colors"
              aria-label="GitHub"
            >
              <Github className="h-5 w-5" />
            </a>
            <a
              href="https://x.com/@AInest01"
              target="_blank"
              className="text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Twitter"
            >
              <Twitter className="h-5 w-5" />
            </a>
            <a
              href="#"
              className="text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Website"
            >
              <Globe className="h-5 w-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
