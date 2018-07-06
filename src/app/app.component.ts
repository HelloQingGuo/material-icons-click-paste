import { Component } from "@angular/core";
import { icons, icon } from "./icons";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent {
  icons: icon[] = icons;

  fallbackCopyTextToClipboard(text, idx) {
    const textArea = document.createElement("textarea");
    textArea.value = text;

    const listOfIcons = document.getElementById("list-icon");
    listOfIcons.insertBefore(textArea, listOfIcons.children[idx]);
    textArea.focus();
    textArea.select();

    try {
      var successful = document.execCommand("copy");
      var msg = successful ? "successful" : "unsuccessful";
      console.log("Fallback: Copying text command was " + msg);
    } catch (err) {
      console.error("Fallback: Oops, unable to copy", err);
    }

    listOfIcons.removeChild(textArea);
  }

  copyTextToClipboard(icon, idx) {
    // const transformedText = `<i class="material-icons">${icon.name}</i>`;
    const matIcon = `<mat-icon>${icon.name}</mat-icon>`;
    if (!(window.navigator as any).clipboard) {
      this.fallbackCopyTextToClipboard(matIcon, idx);
      return;
    }
    (window.navigator as any).writeText(matIcon).then(
      () => {
        alert("Async: Copying to clipboard was successful!");
      },
      function(err) {
        alert("Async: Could not copy text: ");
      }
    );
  }
}
