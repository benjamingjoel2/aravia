/**
 * Photography, loaded from Unsplash under the Unsplash Licence (https://unsplash.com/license).
 * next/image fetches, resizes and caches each photo, so visitors only ever request this site's domain.
 * `place` is set only when the photo is of that destination; all others are mood images used where no place is named.
 * Sources and intended use: docs/photo-shortlist.md
 */

export type Photo = {
  src: string;
  alt: string;
  /** Unsplash photo page, for credits. */
  credit: string;
  width: number;
  height: number;
  /** Destination slug when the photo shows that place. */
  place?: string;
};

export const photos = {
  dunesDuskSun: { src: "https://images.unsplash.com/photo-1515824821552-dfe57dff3bfd", alt: "The sun setting low over a sea of dunes, the sand already in shadow", credit: "https://unsplash.com/photos/desert-during-golden-hour-mUwe7LpjikE", width: 2400, height: 1599 },
  seaNightStars: { src: "https://images.unsplash.com/photo-1512653545212-2a3c77b17546", alt: "A pale beach and a still sea under a night sky full of stars", credit: "https://unsplash.com/photos/white-sand-beside-body-of-water-during-night-time-mDn__cEOX8w", width: 2400, height: 1476 },
  desertDuskHorizon: { src: "https://images.unsplash.com/photo-1512165162622-ca7f4702426e", alt: "A flat desert at dusk, distant hills on a thin band of orange light", credit: "https://unsplash.com/photos/desert-taken-during-golden-hour-L_WSFi8czFc", width: 2400, height: 1596 },
  petraSiqTreasury: { src: "https://images.unsplash.com/photo-1500120194857-62b493650979", alt: "The Treasury at Petra seen through the narrow walls of the Siq", credit: "https://unsplash.com/photos/petra-jordan-yddF8bE4JTc", width: 2400, height: 3600, place: "petra" },
  petraTreasury: { src: "https://images.unsplash.com/photo-1501232060322-aa87215ab531", alt: "The carved facade of the Treasury at Petra, rose-red in the light", credit: "https://unsplash.com/photos/petra-jordan-5JHj33-s604", width: 2400, height: 1590, place: "petra" },
  dubaiBurjAlArab: { src: "https://images.unsplash.com/photo-1518684079-3c830dcef090", alt: "Burj Al Arab rising from the sea off Dubai, the Palm beyond", credit: "https://unsplash.com/photos/burj-al-arab-dubai-7tb-b37yHx4", width: 2400, height: 3600, place: "dubai" },
  dubaiBurjKhalifa: { src: "https://images.unsplash.com/photo-1510665724063-f77a01074aa2", alt: "Burj Khalifa lit against the night sky in Dubai", credit: "https://unsplash.com/photos/burj-khalifa-skyscraper-in-dubai-XFEJPXUqbYc", width: 2400, height: 3597, place: "dubai" },
  minaretsSunset: { src: "https://images.unsplash.com/photo-1487800940032-1cf211187aea", alt: "Two slender minarets and a dome in silhouette at sunset", credit: "https://unsplash.com/photos/two-mosque-minarets-under-calm-sky-uwzPks8CE3k", width: 2400, height: 1602 },
  dunesWideSun: { src: "https://images.unsplash.com/photo-1523515404965-31379d9072da", alt: "Wide dunes under a bright sky, mountains on the horizon", credit: "https://unsplash.com/photos/photo-of-desert-dunes-AheSMRAVY44", width: 2400, height: 3597 },
  duneEveningShadow: { src: "https://images.unsplash.com/photo-1520352950491-a5c4bb0a9640", alt: "A long curve of dune falling into evening shadow below a rocky ridge", credit: "https://unsplash.com/photos/photo-of-brown-desert-during-golden-hour-HUuq5l7Eaak", width: 2400, height: 3201 },
  duneCrestLight: { src: "https://images.unsplash.com/photo-1509223397999-28fd1c5f11f5", alt: "Light catching the sharp crest of a dune", credit: "https://unsplash.com/photos/sand-dunes-at-daytime-ShQbbBBvoPM", width: 2400, height: 1596 },
  dunesSoftPale: { src: "https://images.unsplash.com/photo-1497039579430-32996cca908c", alt: "Soft, pale dunes under a clear sky", credit: "https://unsplash.com/photos/sand-dunes-during-daytime-Rl8lTA4iikk", width: 2400, height: 3600 },
  duneRipplesGold: { src: "https://images.unsplash.com/photo-1508866624368-3488f2af5f46", alt: "A dune rippled by wind, glowing gold in low sun", credit: "https://unsplash.com/photos/photo-of-desert-dune-L5S__od_8Ww", width: 2400, height: 1800 },
  duneOrangeSky: { src: "https://images.unsplash.com/photo-1510075644440-2c2b60679e1a", alt: "A single orange dune against a clear blue sky", credit: "https://unsplash.com/photos/sand-dune-during-daytime-bN00NZvfA4E", width: 2400, height: 1599 },
  desertDuskClouds: { src: "https://images.unsplash.com/photo-1523298266675-0a13319d9034", alt: "An open desert plain under clouds at dusk", credit: "https://unsplash.com/photos/desert-during-sunrise-J56V5znTVec", width: 2400, height: 1599 },
  sandRipplesMono: { src: "https://images.unsplash.com/photo-1509478678343-68e565ede2e9", alt: "Wind ripples in sand, in black and white", credit: "https://unsplash.com/photos/a-black-and-white-photo-of-a-sand-dune-8FB-hgVJpEU", width: 2400, height: 1800 },
  sandRipplesClose: { src: "https://images.unsplash.com/photo-1515996671481-f76b5124f3d5", alt: "Close detail of wind-shaped ripples in sand", credit: "https://unsplash.com/photos/gray-sand-dunes-RlM7GRvkqE8", width: 2400, height: 1599 },
  sandRipplesLight: { src: "https://images.unsplash.com/photo-1517202415430-33ea7bce2109", alt: "Ripples of sand catching the last light", credit: "https://unsplash.com/photos/a-close-up-view-of-a-sand-dune-fWAQQ3cm2M8", width: 2400, height: 1599 },
  sandRipplesGold: { src: "https://images.unsplash.com/photo-1521397336021-1c2c275f7dee", alt: "Golden sand patterned by the wind", credit: "https://unsplash.com/photos/aerial-view-of-desert-sand-IDcGb0vpyKI", width: 2400, height: 1593 },
  yachtAerial: { src: "https://images.unsplash.com/photo-1525456535336-65e0abf79908", alt: "A yacht crossing turquoise water, seen from above", credit: "https://unsplash.com/photos/aerial-photo-of-white-and-brown-yacht-on-water-2OKGgSuAAWA", width: 2400, height: 2400 },
  shoreWavesAerial: { src: "https://images.unsplash.com/photo-1525792189476-ab5c236da0cd", alt: "Waves breaking on a dark shore, seen from above", credit: "https://unsplash.com/photos/birds-eye-view-of-seashore-meeting-the-sand-_7j0en_C4xg", width: 2400, height: 1500 },
} satisfies Record<string, Photo>;

export type PhotoKey = keyof typeof photos;
