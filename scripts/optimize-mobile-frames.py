"""Generate lightweight mobile backgrounds. Requires Pillow: pip install Pillow."""
from concurrent.futures import ThreadPoolExecutor
from pathlib import Path

from PIL import Image

ROOT = Path(__file__).resolve().parents[1]
SOURCE = ROOT / 'public' / 'frames'
DESTINATION = SOURCE / 'mobile'
DESTINATION.mkdir(exist_ok=True)


def convert(path):
    with Image.open(path) as image:
        image.thumbnail((768, 432), Image.Resampling.LANCZOS)
        destination = DESTINATION / f'{path.stem}.webp'
        image.save(destination, 'WEBP', quality=55, method=6)
        return path.stat().st_size, destination.stat().st_size


if __name__ == '__main__':
    with ThreadPoolExecutor(max_workers=4) as executor:
        sizes = list(executor.map(convert, sorted(SOURCE.glob('ezgif-frame-*.jpg'))))
    print(f'{len(sizes)} frames: {sum(s[0] for s in sizes):,} → {sum(s[1] for s in sizes):,} bytes')
