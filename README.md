# Focus Invoice

Clock project sessions and round their combined duration once per project for billing.

Round the combined time for each project once. Several short interruptions on one job can fit within one billing block instead of each becoming a separate minimum charge.

## Switch projects while working

1. Set the project names, hourly rate and billing block in device settings. Turn to the project you are starting and press **Start**.
2. Turn to another project when the work changes, then press **Start**. Browsing alone does not change the active timer.
3. Starting the new project settles the old one to its own total. In the first clip the selected name changes from Design to Research.

![Design gives way to Research with elapsed time on the front.](media/guide/switch-from-design-to-research.gif)

## Read the rounded amount

1. Click the wheel to switch the selected project from elapsed time to invoice amount. The rear shows raw duration, rounded billable minutes and rate.
2. Press **Start** on the active project to stop its timer. The amount remains available after the session ends.
3. Turn through projects to read their totals individually. Click again to get back to elapsed time.

![The Research view changes from elapsed time to a 15.00 amount.](media/guide/inspect-research-amount.gif)

## Example from the emulator

At 60 per hour with a 15-minute block, two four-minute sessions on one project total eight minutes. The rounded total is 15 minutes, or 15.00. A third ten-minute session takes raw time to 18 minutes and the billable total to 30.

## Run in the emulator

Open BUSY Bar Emulator. From this repository, run:

```sh
~/.busy-emulator/bin/busy-emulator dev --once
```

Press **Back** to exit.

The GIFs are excerpts from the emulator recording. Each front-display pixel is shown at 9× its original width and height. The end frames pause for reading.

[Full recording](media/controls.mp4) · [Rear display](screenshots/back-1.png) · [Firmware test](EMULATOR-QA.md) · [MIT license](LICENSE)
