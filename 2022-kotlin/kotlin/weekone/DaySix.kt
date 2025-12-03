package weekone

class DaySix {

    fun partOne(s: String): Int {
        return getStartIndex(s, 4)
    }

    fun partTwo(s: String): Int {
        return getStartIndex(s, 14)
    }

    private fun getStartIndex(s: String, subStringSize: Int): Int {
        return (subStringSize .. s.length).toList().first { isUniqueSubString(s, it, subStringSize) }
    }

    private fun isUniqueSubString(s: String, i: Int, subStringSize: Int): Boolean {
        return s.substring(i - subStringSize, i).toList().toSet().size == subStringSize
    }
}