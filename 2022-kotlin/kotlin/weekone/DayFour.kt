package weekone

class DayFour {
    fun partOne(list: List<String>): Long {
        return list.sumOf { row ->
            val elfs = row.split(",")
            val firstIds = getIds(elfs[0])
            val secondIds = getIds(elfs[1])

            if (isContains(firstIds, secondIds)) 1L else 0L
        }
    }

    fun partTwo(list: List<String>): Long {
        return list.sumOf { row ->
            val elfs = row.split(",")
            val firstIds = getIds(elfs[0])
            val secondIds = getIds(elfs[1])

            if (isContainsAny(firstIds, secondIds)) 1L else 0L
        }
    }

    private fun getIds(range: String): List<Int> {
        val bottom = range.split("-")[0].toInt()
        val top = range.split("-")[1].toInt()
        return (bottom .. top).toList()
    }

    private fun isContains(first: List<Int>, second: List<Int>): Boolean {
        return first.containsAll(second) || second.containsAll(first)
    }

    private fun isContainsAny(first: List<Int>, second: List<Int>): Boolean {
        return first.any { second.contains(it) }
    }
}