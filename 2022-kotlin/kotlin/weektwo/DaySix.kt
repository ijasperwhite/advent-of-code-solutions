package weektwo

// Day 13 week 2 day 1
class DaySix {
    fun partOne(list: List<String>): Long {
        (0..list.size).filter { it % 3 == 0 }.toList().map { i ->
            val l = list[i]
            val r = list[i + 1]

//            val left = buildLists(l, 0, emptyList())
//            val right = buildLists(r, 0, emptyList())

            println(r)
        }

        return 0L
    }

    private fun build(s: String) {

    }

//    private fun buildLists(s: String, i: Int, lists: List<Any>): List<Any> {
//        return when (val current = s[i]) {
//            ',' -> {
//                buildLists(s, i + 1, lists)
//            }
//            '[' -> {
//                lists + listOf(buildLists(s, i + 1, emptyList()))
//            }
//            ']' -> {
//                if (i == s.length - 1) {
//                    lists
//                } else {
//                    lists + buildLists(s, i + 1, emptyList())
//                }
//            }
//            else -> {
//                val new = lists + listOf(current.code - 48)
//                buildLists(s, i + 1, new)
//            }
//        }
//    }

    fun partTwo(list: List<String>): Long {
        return 0L
    }
}