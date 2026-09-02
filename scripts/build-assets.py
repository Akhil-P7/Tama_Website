"""
Build web assets for usetama.me:
  1. Compress the source artwork (they ship at 500KB-1.9MB, far too heavy for a
     marketing page) into progressive JPEG + WebP.
  2. Composite a proper 1200x630 Open Graph / Twitter card.

Run:  python scripts/build-assets.py
"""

from PIL import Image, ImageDraw, ImageFont, ImageFilter
import os
import random

SRC = "drawable"
OUT = "public/images"
os.makedirs(OUT, exist_ok=True)


def find_font(candidates, size):
    roots = [r"C:\Windows\Fonts", "/usr/share/fonts", "/Library/Fonts"]
    for name in candidates:
        for root in roots:
            path = os.path.join(root, name)
            if os.path.exists(path):
                try:
                    return ImageFont.truetype(path, size)
                except Exception:
                    pass
    return ImageFont.load_default()


SERIF = ["georgiab.ttf", "Georgia Bold.ttf", "times.ttf", "DejaVuSerif-Bold.ttf"]
SERIF_I = ["georgiai.ttf", "Georgia Italic.ttf", "timesi.ttf", "DejaVuSerif-Italic.ttf"]
SANS = ["segoeui.ttf", "arial.ttf", "DejaVuSans.ttf"]
SANS_B = ["seguisb.ttf", "arialbd.ttf", "DejaVuSans-Bold.ttf"]


# ---------------------------------------------------------------- 1. compress
def compress():
    targets = {
        "tama_mascot_avatar.jpg": 900,
        "tama_open_lifebook.png": 1400,
        "tama_cozy_night.png": 1400,
        "tama_sunset_hill.jpg": 1400,
        "tama_sleeping_clouds.svg": 1400,
    }
    report = []
    for name, max_w in targets.items():
        src = os.path.join(SRC, name)
        if not os.path.exists(src):
            continue
        im = Image.open(src).convert("RGB")
        if im.width > max_w:
            h = round(im.height * max_w / im.width)
            im = im.resize((max_w, h), Image.LANCZOS)

        jpg = os.path.join(OUT, name)
        im.save(jpg, "JPEG", quality=82, optimize=True, progressive=True)

        webp = os.path.join(OUT, name.rsplit(".", 1)[0] + ".webp")
        im.save(webp, "WEBP", quality=80, method=6)

        report.append(
            (name, os.path.getsize(src), os.path.getsize(jpg), os.path.getsize(webp))
        )

    # Splash art is only used in the press kit; shrink it hard.
    sp = os.path.join(SRC, "splash_background.png")
    if os.path.exists(sp):
        im = Image.open(sp).convert("RGB")
        im.thumbnail((900, 1600), Image.LANCZOS)
        im.save(os.path.join(OUT, "splash_background.jpg"), "JPEG",
                quality=80, optimize=True, progressive=True)
        report.append(("splash_background.png", os.path.getsize(sp),
                       os.path.getsize(os.path.join(OUT, "splash_background.jpg")), 0))
    return report


# --------------------------------------------------------------------- 2. og
def make_og(filename="og-default.jpg", headline="Your life, remembered.",
            sub="An AI companion that listens, remembers, and quietly cares."):
    W, H = 1200, 630
    card = Image.new("RGB", (W, H), "#081241")

    # Vertical twilight gradient
    grad = Image.new("RGB", (1, H))
    top, mid, bot = (8, 18, 65), (13, 26, 82), (28, 31, 95)
    for y in range(H):
        t = y / (H - 1)
        if t < 0.55:
            k = t / 0.55
            c = tuple(round(top[i] + (mid[i] - top[i]) * k) for i in range(3))
        else:
            k = (t - 0.55) / 0.45
            c = tuple(round(mid[i] + (bot[i] - mid[i]) * k) for i in range(3))
        grad.putpixel((0, y), c)
    card = grad.resize((W, H))

    # Warm bloom behind where the mascot sits
    bloom = Image.new("RGB", (W, H), "#081241")
    bd = ImageDraw.Draw(bloom)
    bd.ellipse([740, 90, 1240, 590], fill="#4a3a6e")
    bd.ellipse([840, 170, 1140, 470], fill="#7a5a7e")
    bloom = bloom.filter(ImageFilter.GaussianBlur(95))
    card = Image.blend(card, bloom, 0.55)

    # Periwinkle glow top-left
    glow = Image.new("RGB", (W, H), "#081241")
    gd = ImageDraw.Draw(glow)
    gd.ellipse([-220, -260, 520, 380], fill="#2b3fa8")
    glow = glow.filter(ImageFilter.GaussianBlur(110))
    card = Image.blend(card, glow, 0.4)

    # Starfield
    rnd = random.Random(20260827)
    d = ImageDraw.Draw(card)
    for _ in range(150):
        x, y = rnd.randint(0, W), rnd.randint(0, H)
        r = rnd.choice([0.6, 0.9, 1.2, 1.6])
        a = rnd.randint(90, 235)
        warm = rnd.random() < 0.3
        col = (255, 236, 200) if warm else (255, 255, 255)
        d.ellipse([x - r, y - r, x + r, y + r],
                  fill=tuple(round(c * a / 255) for c in col))

    # Mascot, rounded, with a soft halo
    mp = os.path.join(SRC, "tama_mascot_avatar.jpg")
    if os.path.exists(mp):
        size = 340
        m = Image.open(mp).convert("RGB")
        side = min(m.size)
        m = m.crop(((m.width - side) // 2, (m.height - side) // 2,
                    (m.width + side) // 2, (m.height + side) // 2))
        m = m.resize((size, size), Image.LANCZOS)

        mask = Image.new("L", (size, size), 0)
        ImageDraw.Draw(mask).rounded_rectangle([0, 0, size - 1, size - 1],
                                              radius=64, fill=255)

        mx, my = 780, (H - size) // 2

        halo = Image.new("L", (W, H), 0)
        ImageDraw.Draw(halo).ellipse(
            [mx - 70, my - 70, mx + size + 70, my + size + 70], fill=115)
        halo = halo.filter(ImageFilter.GaussianBlur(60))
        card.paste(Image.new("RGB", (W, H), "#ffd9b3"), (0, 0), halo)

        card.paste(m, (mx, my), mask)

    # Text block
    d = ImageDraw.Draw(card)
    f_brand = find_font(SANS_B, 26)
    f_head = find_font(SERIF, 62)
    f_head_i = find_font(SERIF_I, 62)
    f_sub = find_font(SANS, 25)
    f_foot = find_font(SANS_B, 20)

    x = 76
    d.text((x, 108), "T A M A   A I", font=f_brand, fill="#ffd9b3")

    # Headline: split so the final word can be italic, matching brand styling.
    words = headline.rsplit(" ", 1)
    y = 168
    if len(words) == 2:
        d.text((x, y), words[0], font=f_head, fill="#ffffff")
        w = d.textlength(words[0] + " ", font=f_head)
        d.text((x + w, y), words[1], font=f_head_i, fill="#ffd9b3")
    else:
        d.text((x, y), headline, font=f_head, fill="#ffffff")

    # Wrap the subtitle
    y = 268
    line, lines = "", []
    for word in sub.split():
        probe = (line + " " + word).strip()
        if d.textlength(probe, font=f_sub) > 600 and line:
            lines.append(line)
            line = word
        else:
            line = probe
    lines.append(line)
    for ln in lines:
        d.text((x, y), ln, font=f_sub, fill="#c9c6e8")
        y += 36

    # Footer pledges
    y += 22
    for i, chip in enumerate(["No ads", "No romantic roleplay", "Care never paywalled"]):
        cw = d.textlength(chip, font=f_foot)
        d.rounded_rectangle([x, y, x + cw + 30, y + 40], radius=20,
                            fill="#1e2a63", outline="#3d4a92")
        d.text((x + 15, y + 10), chip, font=f_foot, fill="#e8e6ff")
        x += cw + 42
        if i == 1:
            x, y = 76, y + 52

    d.text((76, H - 58), "usetama.me", font=f_foot, fill="#8f8bc4")

    out = os.path.join(OUT, filename)
    card.save(out, "JPEG", quality=88, optimize=True, progressive=True)
    return out, os.path.getsize(out)


if __name__ == "__main__":
    print("Compressing artwork")
    for name, a, b, c in compress():
        extra = f" | webp {c/1024:6.1f} KB" if c else ""
        print(f"  {name:32s} {a/1024:8.1f} KB -> {b/1024:7.1f} KB{extra}")

    print("\nOpen Graph cards")
    for fn, head, sub in [
        ("og-default.jpg", "Your life, remembered.",
         "An AI companion that listens, remembers, and quietly cares."),
        ("og-lifebook.jpg", "The Lifebook.",
         "You never have to journal. You just talk, and Tama writes the day for you."),
        ("og-privacy.jpg", "Honest privacy.",
         "Your raw usage data never leaves your phone. We will not claim more than that."),
    ]:
        p, s = make_og(fn, head, sub)
        print(f"  {p:38s} {s/1024:7.1f} KB")
