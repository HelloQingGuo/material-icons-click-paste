import { Component } from "@angular/core";
import { icons, icon } from "./icons";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent {
  icons: icon[] = icons;

  fallbackCopyTextToClipboard(matIcon, idx) {
    const transformedText = `<mat-icon>${matIcon.name}</mat-icon>`;
    const textArea = document.createElement("textarea");
    textArea.value = transformedText;

    const listOfIcons = document.getElementById("list-icon");
    listOfIcons.insertBefore(textArea, listOfIcons.children[idx]);
    textArea.focus();
    textArea.select();

    try {
      const isSucceeded = document.execCommand("copy");
      if (isSucceeded) {
        alert(`"${matIcon.name}" copied to clipboard was successful !`);
      } else {
        alert(`Unable to copy "${matIcon.name}" !`);
      }
    } catch (err) {
      alert(`Unable to copy "${matIcon.name}" !`);
    }

    listOfIcons.removeChild(textArea);
  }

  copyTextToClipboard(matIcon, idx) {
    // const transformedText = `<i class="material-icons">${icon.name}</i>`;
    const transformedText = `<mat-icon>${matIcon.name}</mat-icon>`;
    if (!(window.navigator as any).clipboard) {
      this.fallbackCopyTextToClipboard(matIcon, idx);
      return;
    }
    if ((window.navigator as any).clipboard) {
      (window.navigator as any).clipboard.writeText(transformedText).then(
        () => {
          alert(`"${matIcon.name}" copied to clipboard was successful !`);
        },
        err => {
          alert(`Could not copy "${matIcon.name}" !`);
        }
      );
    }
  }
}
