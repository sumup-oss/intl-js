---
'@sumup-oss/intl': minor
---

Hard-coded the maximum fraction digits for Colombian pesos (COP) and Hungarian forint (HUF) to ensure consistency between computer systems which strictly follow ISO 4217 (Node, Firefox, Safari) and those that don't (Chrome). Even though these currencies don't use decimal values in everyday life, ISO 4217 defines the number of decimal places as 2.
