# **Strategic Design Specification: The Web-Based Operating System Interface**

## **1\. Executive Vision and Architectural Philosophy**

### **1.1 The Paradigm Shift: From Scroll to Space**

The conventional landing page—a linear, vertical scroll of information—has reached a point of diminishing returns in the current digital landscape. Users, particularly those in technical and creative sectors, have developed "banner blindness" to standard marketing tropes. The "Web Desktop" or "OS-style" interface represents a radical departure from this linear consumption model, moving towards a spatial, non-linear interaction paradigm.1 By simulating a fully functional operating system within the browser, we leverage the user's pre-existing mental models of desktop computing—windows, taskbars, file systems, and multitasking—to create an environment that feels less like a brochure and more like a powerful utility.2

This document serves as a comprehensive design bible for constructing a high-fidelity "OS" landing page. It synthesizes the high-performance aesthetic of productivity tools like **Linear** 3, the command-driven efficiency of **Raycast** 4, and the spatial materiality of Apple’s **visionOS**.5 The goal is not merely to mimic an operating system for novelty’s sake but to utilize these metaphors to organize dense information hierarchies in a way that feels intuitive, explorable, and unexpectedly delightful.

### **1.2 Defining the "Productivity Luxury" Aesthetic**

The visual language for this project is rooted in a specific sub-genre of interface design often termed "Productivity Luxury" or "Developer Native." This aesthetic is characterized by a rejection of the overly colorful "corporate Memphis" style in favor of deep, high-contrast dark modes, precision typography, and subtle, physics-based motion.

Key aesthetic pillars include:

* **Luminous Containment:** Drawing from **Linear’s** design system, elements are not defined by heavy borders but by "light" that seems to emanate from within or cast upon edges. This creates a sense of depth without the heaviness of traditional skeuomorphism.6  
* **Liquid Materiality:** Inspired by **visionOS**, surface materials are not opaque blocks of color. They are complex, refractive glass layers that blur and saturate the background, rooting the interface in a simulated physical space.5  
* **Spatial Permanence:** Unlike a scrolling page where content disappears off-screen, the OS desktop is a permanent stage. Windows enter and exit, but the context remains stable. This creates a sense of "place" and ownership for the user.8

### **1.3 Target Audience and Psychological Triggers**

The persona for this interface is the "Builder"—developers, designers, and product managers who value craftsmanship. For this demographic, the medium is the message. A portfolio or product page built as a functional OS signals technical competence, attention to detail, and a respect for the user's intelligence.

| User Attribute | Design Response | Psychological Trigger |
| :---- | :---- | :---- |
| **High Tech-Literacy** | Command Palette (Cmd+K) navigation | Respects their muscle memory and desire for efficiency.4 |
| **Appreciation for Craft** | Pixel-perfect 1px borders & spring physics | Signals quality and care; "If the site is this good, the product must be too." |
| **Information Density** | Bento-grid layouts and windowing | Allows for high data density without clutter; respects their ability to parse complex UIs.9 |
| **"Dark Mode" Preference** | Default dark theme with neon accents | Aligns with the "IDE aesthetics" developers stare at all day.10 |

### **1.4 The "App" Metaphor for Content Strategy**

A critical strategic decision in this design is the translation of traditional web content into OS "Applications." This recontextualization changes how users engage with the information. They are not "reading a section"; they are "opening an app."

* **The "About" Section** becomes a **Text Editor** or **Markdown Viewer**. This frames the personal biography as raw code or documentation, implying transparency and technical roots.  
* **The "Portfolio" Section** becomes a **Finder/Explorer** window. Projects are files; categories are folders. This encourages exploration and non-linear discovery.  
* **The "Contact" Section** becomes a **Mail Client** or **Messaging App**. It transforms a static form into a communication tool.11

## ---

**2\. The Visual Design System (VDS)**

### **2.1 Color Theory: The "Linear" Dark Mode**

The color palette must move beyond simple blacks and whites to creating a rich, atmospheric dark mode. We utilize a split-complementary scheme anchored in deep charcoal and illuminated by "electric" purples and cyans, characteristic of the Linear brand aesthetic.13

#### **2.1.1 The Atmospheric Grays**

Pure black (\#000000) is rarely used in high-end interfaces because it creates harsh contrasts and "smears" on OLED screens. Instead, we use a chromatic gray scale—grays infused with a hint of blue or purple to add warmth and depth.

| Token Name | Hex Value | Description | Usage Context |
| :---- | :---- | :---- | :---- |
| bg-void | \#080808 | Deepest Background | The "Desktop" wallpaper base layer. |
| surface-base | \#0F1115 | Window Background | The opaque layer for active windows; slightly warm charcoal. |
| surface-elevated | \#16181D | Modals / Dropdowns | Secondary elevation; lighter to simulate proximity to light. |
| surface-glass | \#121212CC | Translucent Panels | Used for the Dock and Sidebar; 80% opacity. |
| border-subtle | \#22252B | Structural Borders | Defining the shape of windows in inactive states. |
| border-luminous | \#3F4451 | Active Borders | Simulates light hitting the edge of a focused window.6 |

#### **2.1.2 The "Linear" Glow System**

A defining characteristic of the Linear aesthetic is the use of borders that act as light sources. We do not simply stroke a 1px border; we apply a "gradient mask" or a specific box-shadow stack to create a glow.

* **Primary Accent:** \#5E6AD2 (Linear Purple).13  
* **Glow Recipe:**  
  * *Inner Ring:* box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.1) (Simulates the cut glass edge).  
  * *Outer Glow:* box-shadow: 0 0 0 1px rgba(94, 106, 210, 0.5), 0 0 12px rgba(94, 106, 210, 0.3) (The colored light spill).  
  * *Context:* This is applied to the *active* window or the *selected* item in a list, guiding the user's focus immediately.14

### **2.2 Materiality: VisionOS Glassmorphism**

While Linear provides the color and border logic, **visionOS** provides the surface material logic. Modern glassmorphism is not just blur(); it is a complex stack of filters designed to maintain legibility while creating a sense of physical thickness.5

#### **2.2.1 The "Liquid Glass" Stack**

To achieve the premium, heavy glass look found in Apple's spatial computing, we must implement a specific CSS composition that separates the "frosted" layer from the "reflective" layer.

1. **The Base Layer (Tint):** background: rgba(20, 20, 20, 0.65). This provides the dark tint necessary for white text legibility.  
2. **The Blur Filter:** backdrop-filter: blur(24px). A high blur radius is essential. Low blur values (5-10px) look "dirty" or "foggy." High blur values (20px+) look like premium ground glass.15  
3. **The Saturation Boost:** backdrop-filter: saturate(180%). This is the secret sauce of Apple's material. It boosts the colors of the wallpaper *behind* the glass, making the UI feel vibrant and alive rather than washed out.7  
4. **The Noise Texture:** A 4% opacity monochromatic noise image overlay is applied to the glass surface. This prevents color banding (gradients looking stepped) and adds tactile realism, mimicking the imperfections of physical materials.

#### **2.2.2 Accessibility in Glass**

Glassmorphism creates inherent contrast risks. The design system must enforce a strict "High Contrast" fallback logic.

* **Rule:** If the OS detects prefers-contrast: more or prefers-reduced-transparency, the glass material resolves to solid surface-elevated (\#16181D) with a 2px solid border.  
* **Text Contrast:** Never place gray text on glass. Text on glass must be White (\#FFFFFF, 100% opacity) or Off-White (\#EDEDED, 90% opacity). Secondary text should be White with 60% opacity, not a gray hex code, to ensure it adapts to the background color shift.16

### **2.3 Typography: The Geist System**

Typography in an OS interface serves a different purpose than in a blog; it is structural. We will standardize on **Geist**, the typeface family developed by Vercel. Geist is explicitly designed for developer tools, bridging the gap between the Swiss minimalist tradition (Helvetica/Inter) and the technical precision of code editors.18

#### **2.3.1 Typeface Selection**

* **Geist Sans:** Used for UI chrome, window titles, and general content. Its high x-height and open apertures make it legible at very small sizes (e.g., 11px or 12px labels on a desktop grid).  
* **Geist Mono:** Used for tabular data, timestamps, ID tags, and code snippets. The monospaced variant aligns perfectly with the "developer" persona, reinforcing the technical nature of the site.20

#### **2.3.2 The Structural Type Scale**

We abandon the traditional "T-shirt sizing" (S, M, L, XL) in favor of a pixel-rigid scale that maps to the grid.

| Role | Font Family | Size (px) | Line Height (px) | Tracking | Application |
| :---- | :---- | :---- | :---- | :---- | :---- |
| **Grid Label** | Geist Sans Med | 11 | 16 | 0.02em | Desktop icon labels. |
| **Ui Label** | Geist Sans Reg | 12 | 16 | 0.01em | Tooltips, status bars. |
| **Body Small** | Geist Sans Reg | 13 | 20 | 0 | Sidebar items, dense lists. |
| **Body Main** | Geist Sans Reg | 14 | 24 | 0 | Main text inside windows. |
| **Heading H3** | Geist Sans Med | 16 | 24 | \-0.01em | Window sub-sections. |
| **Heading H1** | Geist Sans Semi | 24 | 32 | \-0.02em | App titles, Hero text. |
| **Mono Data** | Geist Mono Reg | 12 | 16 | 0 | Dates, file sizes, version numbers. |

* **Note on Tracking:** Smaller sizes (11-12px) require positive tracking (+0.01-0.02em) to maintain legibility, while display sizes (24px+) require negative tracking (-0.02em) to look tight and professional.21

### **2.4 Iconography and Visual Assets**

Icons are the wayfinding signage of the OS. We need two distinct classes of icons:

1. **System Icons (Functional):** These are the 1-color icons used inside windows for actions (Edit, Close, Settings).  
   * *Choice:* **Phosphor Icons** or **Lucide React**. Both libraries are built on a 24px grid with consistent 1.5px or 2px strokes. They align perfectly with the "Linear" aesthetic—clean, rounded caps, and highly recognizable.22  
2. **App Icons (Identities):** These are the full-color, desktop-class icons used on the Dock and Launchpad.  
   * *Style:* These should not be flat vectors. They should use the "Squircle" shape (superellipse) standard in iOS/macOS. They should have subtle gradients and depth to look like "pressable" buttons, distinct from the flat UI of the windows.  
   * *Sizing:* 48px base size on Dock; 64px in App Library.

## ---

**3\. Component Architecture: The Dock and Navigation**

The Dock is the gravitational center of the Web OS. It is the primary anchor for user orientation and the most interactive element on the screen. It is not just a menu; it is a physics playground.

### **3.1 The Physics of Magnification**

To capture the premium feel of macOS, the Dock must implement a "Fisheye" magnification effect. This is a non-linear scaling function based on the cursor's distance from each icon.

#### **3.1.1 The Mathematical Model**

We model the magnification using a Gaussian or Sine bell curve function.

* **Inputs:**  
  * mouseX: The current X position of the cursor.  
  * iconX: The center X position of the specific icon.  
  * distance: Math.abs(mouseX \- iconX).  
* **The Transformation Function:**  
  If the distance is within the interactionRange (e.g., 150px), we calculate the scale:  
  ![][image1]  
  * *Base Scale:* 48px  
  * *Max Scale:* 80px  
  * *Result:* A smooth, sine-wave ripple that propagates through the dock items as the mouse moves across them.24

#### **3.1.2 Implementation with Framer Motion**

Using Framer Motion’s useMotionValue and useTransform hooks allows this calculation to happen on the compositor thread, ensuring 60fps performance even on lower-end devices. We map the mouse position directly to the width/height of the icon style without triggering React re-renders.26

### **3.2 Interaction States**

* **The "Active" Indicator:** Apps that are currently "open" (windows present on desktop) must have a visual indicator.  
  * *Design:* A small, glowing white dot (4px diameter) placed 4px below the icon.  
  * *Glow:* box-shadow: 0 0 4px 1px rgba(255, 255, 255, 0.4).  
* **The "Bounce" Notification:** When an app needs attention (e.g., the "Contact" app when a form is successfully sent), it should bounce.  
  * *Physics:* A damped spring animation (stiffness: 300, damping: 10\) that mimics a physical jump and gravity-assisted landing.27  
* **Tooltips:** On hover, a tooltip should appear *instantly* (0ms delay) above the icon. The tooltip should be styled as a small glass pill with Geist Sans Med text, reinforcing the app name.

### **3.3 The "Start" Mechanism: Command Palette**

We diverge from the Windows "Start Menu" in favor of the **Raycast** pattern: a centralized Command Palette (Cmd+K). This appeals to the "Builder" persona who prefers keyboard-centric navigation.4

* **Trigger:** Accessible via a "Search" icon in the Dock or the universal Cmd+K shortcut.  
* **Visual Design:** A high-contrast modal, centered vertically and horizontally.  
  * *Input:* Large text (24px), transparent background, no border. The blinking cursor is the primary visual focus.  
  * *Results List:* A dense list of apps and commands.  
  * *Selection State:* The active item uses the "Linear" border glow (purple left-border accent) to indicate selection.29  
* **Functionality:** It functions as a global router.  
  * "Open Projects" \-\> Launches Finder.  
  * "Toggle Theme" \-\> Switches Dark/Light mode.  
  * "Copy Email" \-\> Copies contact info to clipboard.

## ---

**4\. Component Architecture: The Windowing System**

The window is the fundamental atomic unit of the OS. It encapsulates content and provides the frame for interaction.

### **4.1 Window Anatomy and Chrome**

The "Chrome" refers to the window's frame and controls. It must be minimalist to maximize the content area but distinct enough to be a grab target.

* **Header Bar:** Fixed height (40px).  
  * *Traffic Lights:* Three circles (12px) on the left.  
    * Red: Close (Removes window from DOM or hides it).  
    * Yellow: Minimize (Animates window scale to 0 and opacity to 0, moving towards the Dock icon).  
    * Green: Maximize (Expands window to fill 100vw/100vh minus Dock space).  
  * *Title:* Centered Geist Sans Medium (13px), color text-secondary.  
  * *Material:* The header uses a slightly lighter background (surface-elevated) than the body to imply hierarchy, often with a subtle backdrop-filter if the window is translucent.30

### **4.2 Focus Management and Z-Index Stacking**

A common failure in web-based OS simulations is poor z-index management (e.g., clicking a window doesn't bring it to the front).

* **The Stacking Algorithm:**  
  We maintain a global state array: windowOrder \=.  
  * The z-index of a window is derived from its index in this array. ID\_2 gets z-index: 30, ID\_1 gets z-index: 10\.  
* **The Focus Interaction:**  
  When a user clicks *anywhere* on a window (header or body):  
  1. Event handler captures the Window ID.  
  2. State manager filters that ID out of windowOrder and pushes it to the end of the array.  
  3. React re-renders the styles; the clicked window instantly jumps to the highest z-index.31  
  4. *Visual Feedback:* The "focused" window gets the border-luminous glow (white/purple). "Blurred" (background) windows revert to border-subtle and dim slightly (opacity 0.9).

### **4.3 Draggable Physics and Constraints**

We utilize **Framer Motion's** drag prop to handle the interaction.

* **Elasticity:** We enable dragElastic={0.1}. If the user drags a window to the edge of the screen, it resists movement, adding a feeling of "weight" and preventing the window from being lost off-screen.  
* **Momentum:** Upon release, the window should carry a small amount of momentum before friction brings it to a halt, simulating a physical object sliding on a desk.33  
* **Constraint Box:** The desktop area (minus the Dock height) serves as the dragConstraints.

## ---

**5\. Interaction Design and Motion Choreography**

Static designs feel like web pages. Motion makes them feel like software. The "feel" of the OS is defined by the mathematics of its animations.

### **5.1 The Death of Ease-In-Out**

Standard CSS transitions (ease-in-out, 0.3s) feel robotic because they don't conserve momentum. We strictly use **Spring Physics** for all UI movements.

* **Why Springs?** A spring has mass, stiffness, and damping. If a user "throws" a window (drags and releases), a spring animation can seamlessly pick up that velocity and continue the motion. A duration-based tween cannot do this.26

### **5.2 Global Animation Constants**

We define a "Motion Theme" to ensure consistency across the OS.

| Animation Token | Stiffness | Damping | Mass | Feeling | Usage |
| :---- | :---- | :---- | :---- | :---- | :---- |
| spring-snappy | 500 | 30 | 1 | Instant, precise | Tooltips, Toggle switches. |
| spring-fluid | 300 | 30 | 1 | Smooth, confident | Window opening/closing, Dock scaling. |
| spring-heavy | 200 | 40 | 1.5 | Deliberate, weighty | Modal overlays, Full-screen transitions. |
| spring-bouncy | 400 | 15 | 1 | Playful, energetic | Notification badges, "Attention" animations.35 |

### **5.3 Micro-Interactions**

* **Cursor Spotlight:** As the cursor moves over the "Start Menu" list or grid items, a localized radial gradient (radial-gradient(circle at mouseX mouseY...)) tracks the movement. This "flashlight" effect reveals the border color or slightly brightens the background, reinforcing the "Linear" lighting aesthetic.29  
* **Window Open Sequence:**  
  1. **Scale:** 0.95 ![][image2] 1.0  
  2. **Opacity:** 0 ![][image2] 1  
  3. **Y-Position:** \+20px ![][image2] 0px  
  4. *Timing:* Staggered. The window chrome appears first, followed by content elements cascading in (staggerChildren: 0.05). This makes the app feel like it's "booting up" rather than just popping in.

## ---

**6\. Content Strategy: Translating Marketing to Metadata**

To fully sell the OS metaphor, the content must be structured as "data objects" rather than "marketing copy."

### **6.1 The "Finder" Portfolio**

Instead of a standard grid of project cards, we present a "File System" view.

* **View Modes:** Toggle between "Grid View" (large thumbnails) and "List View" (detailed metadata).  
* **Metadata Columns:**  
  * *Name:* Project Title.  
  * *Date Modified:* The launch date of the project.  
  * *Kind:* "React Application," "Design System," "Case Study."  
  * *Size:* "14.2 MB" (Fake data, or perhaps lines of code).  
* **UX Pattern:** Double-clicking a "folder" navigates deeper (\~/projects/web/). Double-clicking a "file" opens a new window dedicated to that project (the "Preview" app).

### **6.2 The "Terminal" Testimonials**

Social proof is often boring. We gamify it by presenting testimonials as a "Server Log" or "Git Commit History."

* **Visual:** A terminal window with a monospace font (Geist Mono).  
* **Format:**  
  \[2024-10-12 14:30\] COMMIT from @Sarah\_CTO: "Exceptional delivery speed, optimized core web vitals..."  
* **Interaction:** The user can "run" commands like \> run\_credits to see the testimonials scroll by like a matrix code rain.

### **6.3 The "Settings" Control Panel**

This provides user agency, a key component of an OS feel.

* **Wallpaper Picker:** Allow users to switch between 3-4 preset backgrounds (e.g., "Deep Space," "Abstract Mesh," "Solid Minimal"). This customization creates a sense of ownership.36  
* **Sound Toggle:** A switch to enable/disable the UI sound effects.  
* **Performance Mode:** A toggle to disable "Glass Blur" for a faster experience (simulating a "Low Power Mode").

## ---

**7\. Technical Implementation Strategy**

### **7.1 Architecture Stack**

* **Framework:** **Next.js (App Router)**. We need Server Components for the initial shell load and SEO, but the entire Desktop component will be a "Client Component" ('use-client') to handle the heavy interactivity.37  
* **Styling:** **Tailwind CSS**. We will use Tailwind configuration to map our design tokens (e.g., bg-surface-glass) to utility classes.  
* **State:** **Zustand**. We avoid React Context for the window manager because it triggers too many re-renders. Zustand allows us to subscribe specific components (e.g., just the specific window being dragged) to state changes, ensuring 60fps performance.31

### **7.2 Performance Optimization: The Cost of Glass**

Glassmorphism (backdrop-filter) is extremely GPU intensive. If 5 overlapping windows all have blur, the browser has to re-draw every pixel multiple times per frame.

* **Optimization 1: The "Active Window" Rule.** Only the *topmost* window gets the expensive backdrop-filter: blur(24px). Windows behind it can switch to a static opacity or a cheaper blur.  
* **Optimization 2: Will-Change.** We apply will-change: transform to windows *during* the drag gesture to inform the browser to rasterize the element onto its own layer.  
* **Optimization 3: Mobile Fallback.** On screens narrower than 768px, we disable the windowing system entirely. The OS metaphor collapses into a standard "Mobile App" stack navigation. The Dock becomes a fixed bottom tab bar. Draggable windows become full-screen modals.38

### **7.3 Accessibility Strategy**

An OS interface breaks many standard web accessibility patterns. We must patch this.

* **Keyboard Trapping:** When a window is focused, we must ensure the Tab key cycles through interactive elements *inside* that window only, not the desktop icons behind it.  
* **ARIA Roles:**  
  * The Desktop icons are role="button".  
  * The Window is role="dialog" or role="region" with aria-labelledby="window-title".  
  * The Dock is role="navigation".  
* **Reduced Motion:** We must respect prefers-reduced-motion. In this mode, springs are disabled. Windows simply appear/disappear instantly or with a simple crossfade, and the Dock magnification is disabled.

## ---

**8\. Implementation Roadmap**

### **Phase 1: Foundation (Days 1-3)**

* Setup Next.js \+ Tailwind \+ Framer Motion.  
* Define tailwind.config.js with all Linear color tokens and Geist typography.  
* Build the Desktop container and dynamic Wallpaper component.

### **Phase 2: Core Systems (Days 4-7)**

* Build the WindowManager (Zustand store).  
* Create the generic Window shell (Drag logic, Focus logic, Header).  
* Implement the Dock with mouse-position physics.

### **Phase 3: Applications (Days 8-12)**

* Build CommandPalette (Raycast clone).  
* Build Finder (Grid layout logic).  
* Build content "Apps" (About, Work, Contact).

### **Phase 4: Polish (Days 13-14)**

* Tune Spring Physics (spend a full day just on the "feel").  
* Add SFX (Sound effects).  
* Implement Mobile responsive view.  
* Audit Accessibility (Contrast & Keyboard).

## ---

**9\. Conclusion**

This design document outlines a path to creating a web experience that transcends the medium. By treating the browser not as a document viewer but as a runtime environment for a spatial operating system, we create a landing page that is memorable, highly functional, and deeply aligned with the "Builder" ethos. The fusion of **Linear’s** precision lighting with **visionOS’s** spatial materiality creates an aesthetic that feels futuristic yet familiar—a productivity tool from 2026, available today in the browser.

| Metric of Success | Target |
| :---- | :---- |
| **Time on Site** | \> 3 minutes (Exploration driven) |
| **Interaction Rate** | \> 80% (Users opening at least 2 apps) |
| **Perceived Performance** | 60fps animations on average hardware |

This is not just a website; it is a statement of technical artistry.

#### **Works cited**

1. 21 Expert Simulation Modeling Best Practices \- SimWell, accessed February 9, 2026, [https://www.simwell.io/en/blog/simulation-best-practices](https://www.simwell.io/en/blog/simulation-best-practices)  
2. Software Design Document \[Tips & Best Practices\] | The Workstream \- Atlassian, accessed February 9, 2026, [https://www.atlassian.com/work-management/knowledge-sharing/documentation/software-design-document](https://www.atlassian.com/work-management/knowledge-sharing/documentation/software-design-document)  
3. Linear – Plan and build products, accessed February 9, 2026, [https://linear.app/](https://linear.app/)  
4. Web Page Design Mode \- Raycast Store, accessed February 9, 2026, [https://www.raycast.com/danulqua/web-page-design-mode](https://www.raycast.com/danulqua/web-page-design-mode)  
5. visionOS \- Apple Developer, accessed February 9, 2026, [https://developer.apple.com/visionos/](https://developer.apple.com/visionos/)  
6. The rise of Linear style design: origins, trends, and techniques | by Arlene Xu \- Medium, accessed February 9, 2026, [https://medium.com/design-bootcamp/the-rise-of-linear-style-design-origins-trends-and-techniques-4fd96aab7646](https://medium.com/design-bootcamp/the-rise-of-linear-style-design-origins-trends-and-techniques-4fd96aab7646)  
7. Liquid Glass is here — how should designers respond? \- LogRocket Blog, accessed February 9, 2026, [https://blog.logrocket.com/ux-design/apple-liquid-glass-ui/](https://blog.logrocket.com/ux-design/apple-liquid-glass-ui/)  
8. The Complete Guide to Designing for visionOS \- Think Design, accessed February 9, 2026, [https://think.design/blog/the-complete-guide-to-designing-for-visionos/](https://think.design/blog/the-complete-guide-to-designing-for-visionos/)  
9. Landing Page UI \- Dribbble, accessed February 9, 2026, [https://dribbble.com/tags/landing-page-ui](https://dribbble.com/tags/landing-page-ui)  
10. Top 10 Website Trends for 2022 \- Duda Blog, accessed February 9, 2026, [https://blog.duda.co/2022-website-design-trends](https://blog.duda.co/2022-website-design-trends)  
11. Ultimate Guide to User Flows for Exceptional UX \- Justinmind, accessed February 9, 2026, [https://www.justinmind.com/blog/user-flow/](https://www.justinmind.com/blog/user-flow/)  
12. File Structure : Broad Institute of MIT and Harvard, accessed February 9, 2026, [https://mitcommlab.mit.edu/broad/commkit/file-structure/](https://mitcommlab.mit.edu/broad/commkit/file-structure/)  
13. Linear Brand Color Palette: Hex, RGB, CMYK and UIs \- Mobbin, accessed February 9, 2026, [https://mobbin.com/colors/brand/linear](https://mobbin.com/colors/brand/linear)  
14. Designing a colour system \- by Pavel Kiselev \- UX Collective, accessed February 9, 2026, [https://uxdesign.cc/designing-colour-system-d9d39f245e01](https://uxdesign.cc/designing-colour-system-d9d39f245e01)  
15. Create OS-style backgrounds with backdrop-filter | Articles \- web.dev, accessed February 9, 2026, [https://web.dev/articles/backdrop-filter](https://web.dev/articles/backdrop-filter)  
16. What Is Glassmorphism? | IxDF, accessed February 9, 2026, [https://www.interaction-design.org/literature/topics/glassmorphism](https://www.interaction-design.org/literature/topics/glassmorphism)  
17. How to make Glassmorphism more accessible | by Aimee | Bootcamp \- Medium, accessed February 9, 2026, [http://medium.com/design-bootcamp/how-to-make-glassmorphism-more-accessible-9121d816004c](http://medium.com/design-bootcamp/how-to-make-glassmorphism-more-accessible-9121d816004c)  
18. Typography \- Forma 36 \- Contentful, accessed February 9, 2026, [https://f36.contentful.com/tokens/typography](https://f36.contentful.com/tokens/typography)  
19. Typography \- Vercel, accessed February 9, 2026, [https://vercel.com/geist/typography](https://vercel.com/geist/typography)  
20. Design System \- Alephic, accessed February 9, 2026, [https://www.alephic.com/company/design](https://www.alephic.com/company/design)  
21. Typography \- Payroc Design, accessed February 9, 2026, [https://design.payroc.com/typography](https://design.payroc.com/typography)  
22. Best Icon Sets 2025: Top 26 Free Icon Packs by Pro Designers \- Streamline, accessed February 9, 2026, [https://blog.streamlinehq.com/best-free-icon-sets/](https://blog.streamlinehq.com/best-free-icon-sets/)  
23. What's the most complete and consistent icon library that you have used? : r/UXDesign, accessed February 9, 2026, [https://www.reddit.com/r/UXDesign/comments/1fjr4wk/whats\_the\_most\_complete\_and\_consistent\_icon/](https://www.reddit.com/r/UXDesign/comments/1fjr4wk/whats_the_most_complete_and_consistent_icon/)  
24. MacOs magnification Effect in React \- Reddit, accessed February 9, 2026, [https://www.reddit.com/r/react/comments/1cel6w8/macos\_magnification\_effect\_in\_react/](https://www.reddit.com/r/react/comments/1cel6w8/macos_magnification_effect_in_react/)  
25. The magnifying effect in the Mac OS X Dock \- Juankpro \- WordPress.com, accessed February 9, 2026, [https://juankproblog.wordpress.com/2011/02/02/the-magnifying-effect-in-the-mac-os-x-dock/](https://juankproblog.wordpress.com/2011/02/02/the-magnifying-effect-in-the-mac-os-x-dock/)  
26. Motion Values — composable React values \- Motion.dev, accessed February 9, 2026, [https://motion.dev/docs/react-motion-value](https://motion.dev/docs/react-motion-value)  
27. Springy Animated Modals // Framer Motion & React Tutorial for Beginners \- YouTube, accessed February 9, 2026, [https://www.youtube.com/watch?v=SuqU904ZHA4](https://www.youtube.com/watch?v=SuqU904ZHA4)  
28. Whimsical \- Raycast Store, accessed February 9, 2026, [https://www.raycast.com/kud/whimsical](https://www.raycast.com/kud/whimsical)  
29. Browse thousands of Linear App images for design inspiration \- Dribbble, accessed February 9, 2026, [https://dribbble.com/search/linear-app](https://dribbble.com/search/linear-app)  
30. Browse desktop operating system designs for inspiration \- Dribbble, accessed February 9, 2026, [https://dribbble.com/search/desktop-operating-system](https://dribbble.com/search/desktop-operating-system)  
31. I built a macOS-style desktop UI for React (MIT) : r/reactjs \- Reddit, accessed February 9, 2026, [https://www.reddit.com/r/reactjs/comments/1qdiblo/i\_built\_a\_macosstyle\_desktop\_ui\_for\_react\_mit/](https://www.reddit.com/r/reactjs/comments/1qdiblo/i_built_a_macosstyle_desktop_ui_for_react_mit/)  
32. JavaScript multiple draggable DIV windows, zIndex on focus \- Stack Overflow, accessed February 9, 2026, [https://stackoverflow.com/questions/8673768/javascript-multiple-draggable-div-windows-zindex-on-focus](https://stackoverflow.com/questions/8673768/javascript-multiple-draggable-div-windows-zindex-on-focus)  
33. Using the Drag Effect in Framer (Animation Lesson 5\) \- YouTube, accessed February 9, 2026, [https://www.youtube.com/watch?v=lbYuJzFfmXE](https://www.youtube.com/watch?v=lbYuJzFfmXE)  
34. I built animations with Framer Motion, and I'm not going back. | by Sofia Marques \- Medium, accessed February 9, 2026, [https://medium.com/@sofia\_marques/i-built-animations-with-framer-motion-and-im-not-going-back-72e1756d20f5](https://medium.com/@sofia_marques/i-built-animations-with-framer-motion-and-im-not-going-back-72e1756d20f5)  
35. Built a tool to make configuring spring animations easier : r/framer \- Reddit, accessed February 9, 2026, [https://www.reddit.com/r/framer/comments/1md2ixn/built\_a\_tool\_to\_make\_configuring\_spring/](https://www.reddit.com/r/framer/comments/1md2ixn/built_a_tool_to_make_configuring_spring/)  
36. Computer-themed websites? : r/web\_design \- Reddit, accessed February 9, 2026, [https://www.reddit.com/r/web\_design/comments/11kvh4a/computerthemed\_websites/](https://www.reddit.com/r/web_design/comments/11kvh4a/computerthemed_websites/)  
37. Joyful productivity \- Amie, accessed February 9, 2026, [https://amie.so/stories](https://amie.so/stories)  
38. 12 Glassmorphism UI Features, Best Practices, and Examples \- UX Pilot, accessed February 9, 2026, [https://uxpilot.ai/blogs/glassmorphism-ui](https://uxpilot.ai/blogs/glassmorphism-ui)  
39. How to create a Responsive Navigation Bar (for beginners) \- YouTube, accessed February 9, 2026, [https://www.youtube.com/watch?v=U8smiWQ8Seg](https://www.youtube.com/watch?v=U8smiWQ8Seg)

[image1]: <data:image/png;base64,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>

[image2]: <data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABMAAAAYCAYAAAAYl8YPAAABSUlEQVR4XqVSTUqEMQxtQEHRlYgg4s4zzA0E9x7AY4x3ELzDrF16ADeexIXX0Nc2zU+TDiM+SJu895o2800p/waZdS+shQrVklrmJKZlPQit2dwlRSLobf6FOSY+s42GmWZPJLofITEolrpjeaxhFm280XJT/mesXmTuirXfLG7xVV+wn3i6OvXP0/YwQdIN2ELYjiK3LMEXanVFRB9IN/zns4gzzZZR17dzvkF8Iu5YEpwjrrPAxdhpqoV7RHwhTnubPsIzddIE9aCZd/EN/Qf7U+9lMT5GL6ziUX1UzpDtkL2q1fyA9njL1eT5Uu4Rb6WN1xo7jwfzroUWRyh22B8S44HQ228Q70gvnS6YOo/JhZa6JnSM9YILfbQuoZ+vW4/o2YtgDoRBrumV/YtPCE+sa3DNB3kWU4+jwiQ9BppE4tCjqzNLnoVf2FYZUvrZJfYAAAAASUVORK5CYII=>