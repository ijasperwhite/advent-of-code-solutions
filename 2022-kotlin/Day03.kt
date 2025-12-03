package weekone

class DayThree {

    fun partOne(list: List<String>): Long {
        return list.sumOf { row ->
            val half = row.length / 2
            val first = row.substring(0, half)
            val second = row.substring(half, row.length)

            val common = first.first { second.contains(it) }
            getLetterValue(common)
        }
    }

    fun partTwo(list: List<String>): Long {
        val groups = (1..(list.size / 3)).toList().map { index ->
            list.subList(3 * index - 3, 3 * index)
        }
        return groups.sumOf { group ->
            val first = group[0]
            val second = group[1]
            val third = group[2]

            val common = first.first { second.contains(it) && third.contains(it) }
            getLetterValue(common)
        }
    }

    private fun getLetterValue(char: Char): Long {
        val letterValue = (char - 'a' + 1).toLong()
        return when {
            char.isLowerCase() -> letterValue
            char.isUpperCase() -> 58L + letterValue
            else -> throw Exception("Unknown common letter")
        }
    }
}
