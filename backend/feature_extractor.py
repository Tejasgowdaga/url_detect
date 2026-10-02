"""URL-only feature extraction for the phishing classifier."""
import ipaddress
import re
from urllib.parse import urlparse

SUSPICIOUS_WORDS = {
    "login", "verify", "verification", "secure", "account", "update", "confirm",
    "password", "signin", "banking", "wallet", "payment", "bonus", "free", "recover",
    "authenticate", "credential", "unlock", "alert", "webscr", "billing", "support",
}


def _has_ip(host: str) -> int:
    try:
        ipaddress.ip_address(host)
        return 1
    except ValueError:
        return 0


def extract_features(url: str) -> dict:
    """Extract features that can be calculated from the URL string alone."""
    value = str(url).strip()
    candidate = value if re.match(r"^https?://", value, re.I) else "http://" + value
    parsed = urlparse(candidate)
    host = parsed.hostname or ""
    path = parsed.path or ""
    query = parsed.query or ""
    fragment = parsed.fragment or ""
    full = value.lower()
    host_parts = [p for p in host.split(".") if p]
    labels = [p for p in host_parts if p]

    return {
        "url_length": len(value),
        "host_length": len(host),
        "path_length": len(path),
        "query_length": len(query),
        "fragment_length": len(fragment),
        "dot_count": value.count("."),
        "hyphen_count": value.count("-"),
        "at_count": value.count("@"),
        "slash_count": value.count("/"),
        "question_count": value.count("?"),
        "equal_count": value.count("="),
        "ampersand_count": value.count("&"),
        "percent_count": value.count("%"),
        "digit_count": sum(c.isdigit() for c in value),
        "letter_count": sum(c.isalpha() for c in value),
        "special_char_count": sum(not c.isalnum() for c in value),
        "subdomain_count": max(len(host_parts) - 2, 0),
        "has_ip": _has_ip(host),
        "has_https": int(parsed.scheme.lower() == "https"),
        "has_at_symbol": int("@" in value),
        "has_double_slash_path": int("//" in parsed.path),
        "has_punycode": int("xn--" in host.lower()),
        "suspicious_word_count": sum(1 for word in SUSPICIOUS_WORDS if word in full),
        "long_host_label": int(any(len(part) > 25 for part in labels)),
        "max_host_label_length": max((len(part) for part in labels), default=0),
    }


def feature_names():
    return list(extract_features("https://example.com").keys())
