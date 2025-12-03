package weektwo

// Week 2 - Day 2 == DAY 9
class DayTwo {
    fun partOne(list: List<String>): Int {
        var headCurrent = Coordinate(0, 0)
        var tailCurrent = Coordinate(0, 0)

        val tails = list.map {
            val sign = it.split(" ")[0]
            val scalar = it.split(" ")[1].toInt()
            val direction = Direction.from(sign)

            val records = getRecords(headCurrent, tailCurrent, direction, scalar)
            headCurrent = records.last().head
            tailCurrent = records.last().tail
            (records.indices).toList().map { index-> records[index].tail }
        }.flatten()

        return tails.toSet().size
    }

    fun partTwo(list: List<String>): Int {
        var headCurrent = Coordinate(0, 0)
        var tailCurrent = Coordinate(0, 0)

        val tails = list.map {
            val sign = it.split(" ")[0]
            val scalar = it.split(" ")[1].toInt()
            val direction = Direction.from(sign)

            //
            val add = (1 .. scalar).toList().map { adjustment ->
                val records = getRecords(headCurrent, tailCurrent, direction, adjustment)
                if (scalar == adjustment) {
                    headCurrent = records.last().head
                    tailCurrent = records.last().tail
                }
                (records.indices).toList().map { index-> records[index].tail }
            }.flatten().toSet()

            add
        }.flatten()

        return tails.toSet().size
    }

    // Maybe I should do this instead of the getHeadDestination method, return the list of head movements and
    // the list of tail movements
    private fun getRecords(
        headStart: Coordinate,
        tailStart: Coordinate,
        direction: Direction,
        scalar: Int
    ): List<Record> {
        var newTail = tailStart
        var previousHead = headStart
        return (1..scalar).toList().map {
            val newHead = Coordinate(
                x = headStart.x + it * direction.xScalar,
                y = headStart.y + it * direction.yScalar
            )
            if (it > 1) {
                previousHead = Coordinate(
                    x = headStart.x + (it -1) * direction.xScalar,
                    y = headStart.y + (it -1) * direction.yScalar
                )
            }
            val xDiff = Math.abs(newHead.x - newTail.x)
            val yDiff = Math.abs(newHead.y - newTail.y)

            if (xDiff == 2 || yDiff == 2) {
                newTail = previousHead
            }
            Record(newHead, newTail)
        }
    }

    data class Record(val head: Coordinate, val tail: Coordinate)

    data class Coordinate(val x: Int, val y: Int)

    enum class Direction(val sign: String, val xScalar: Int, val yScalar: Int) {
        RIGHT("R", 1, 0),
        LEFT("L", -1, 0),
        UP("U", 0, 1),
        DOWN("D", 0, -1);

        companion object {
            fun from(s: String): Direction = values().first { s == it.sign }
        }
    }
}
