export interface RawRosterPlayer {
  id?: string;
  name: string;
  jersey?: string | number | null;
  position?: string | null;
  teamId: string;
}

export interface NormalizedRosterPlayer {
  id: string;
  displayName: string;
  jerseyNumber: number | null;
  position: string;
  teamId: string;
  searchableText: string;
}

function slugify(value: string): string {
  return value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function parseJersey(jersey: string | number | null | undefined): number | null {
  if (jersey === null || jersey === undefined || jersey === "") return null;
  const parsed = Number(jersey);
  return Number.isInteger(parsed) && parsed >= 0 ? parsed : null;
}

export function normalizeRosterPlayer(player: RawRosterPlayer): NormalizedRosterPlayer {
  const displayName = player.name.trim().replace(/\s+/g, " ");
  const position = (player.position || "UNK").trim().toUpperCase();
  const jerseyNumber = parseJersey(player.jersey);
  const id = player.id || `${player.teamId}-${slugify(displayName)}-${jerseyNumber ?? "na"}`;

  return {
    id,
    displayName,
    jerseyNumber,
    position,
    teamId: player.teamId,
    searchableText: [displayName, position, jerseyNumber ?? ""].join(" ").toLowerCase().trim(),
  };
}

export function normalizeRoster(players: RawRosterPlayer[]): NormalizedRosterPlayer[] {
  const seen = new Set<string>();

  return players.map(normalizeRosterPlayer).filter((player) => {
    if (seen.has(player.id)) return false;
    seen.add(player.id);
    return true;
  });
}

export function findPromptCandidates(
  players: NormalizedRosterPlayer[],
  query: string,
): NormalizedRosterPlayer[] {
  const normalizedQuery = query.trim().toLowerCase();
  if (!normalizedQuery) return [];
  return players.filter((player) => player.searchableText.includes(normalizedQuery));
}
