import { Component } from "@angular/core";
import { icons, icon } from "./icons";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent {
  icons: icon[] = icons;
  isActive = false;
  text: string;
  timer: number;
  dismiss() {
    this.timer = window.setTimeout(() => {
      this.isActive = false;
    }, 2000);
  }

  displayNotification(text) {
    // check if there is a pending dismiss task
    // if so, clear timer
    this.isActive = false;
    window.setTimeout(() => {
      clearTimeout(this.timer);
      this.isActive = true;
      this.text = text;
      this.dismiss();
    }, 150);
  }

  transformText(matIcon) {
    // `<i class="material-icons">${icon.name}</i>`;
    return `<mat-icon>${matIcon.name}</mat-icon>`;
  }

  fallbackCopyTextToClipboard(matIcon, idx) {
    const textArea = document.createElement("textarea");
    textArea.value = this.transformText(matIcon);
    // because the text area takes spaces
    // when it is inserted into the list, if the current element
    // exceeds the view port, the window will scroll to make sure
    // the element is in the view. Therefore, we need to set the size of textarea
    // to 0 to avoid window scrolling.
    textArea.style.height = "0";
    textArea.style.width = "0";
    const listOfIcons = document.getElementById("list-icon");
    listOfIcons.insertBefore(textArea, listOfIcons.children[idx]);
    textArea.focus();
    textArea.select();

    try {
      if (document.execCommand("copy")) {
        this.displayNotification(
          `✨ "${matIcon.name}" was copied to clipboard !`
        );
      } else {
        this.displayNotification(`💥 Unable to copy "${matIcon.name}" !`);
      }
    } catch (err) {
      this.displayNotification(
        `💥 Error happened when copying "${matIcon.name}" !`
      );
    }
    listOfIcons.removeChild(textArea);
  }

  _copyTextToClipboard(matIcon) {
    (window.navigator as any).clipboard
      .writeText(this.transformText(matIcon))
      .then(
        () => {
          this.displayNotification(
            `✨ "${matIcon.name}" was copied to clipboard !`
          );
        },
        err => {
          this.displayNotification(`💥 Unable to copy "${matIcon.name}" !`);
        }
      );
  }

  copyTextToClipboard(matIcon, idx) {
    if (!(window.navigator as any).clipboard) {
      this.fallbackCopyTextToClipboard(matIcon, idx);
    } else {
      this._copyTextToClipboard(matIcon);
    }
  }
}
