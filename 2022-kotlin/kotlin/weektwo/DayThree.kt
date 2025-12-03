package weektwo

class DayThree {
    fun partOne(list: List<String>): Long {
        var initial = 1L
        var counter = 0L
        var cycleSum = 0L
        list.forEach { s ->
            if (s.isNoop()) {
                counter += 1L
                if (counter.isCounterCycle()) {
                    cycleSum += initial * counter
                }
            } else if (s.isAddX()) {
                counter += 1L
                if (counter.isCounterCycle()) {
                    cycleSum += initial * counter
                }
                counter += 1L
                if (counter.isCounterCycle()) {
                    cycleSum += initial * counter
                }
                val v = s.split(" ")[1].toLong()
                initial += v
            } else {
                throw RuntimeException("unknown command")
            }
        }
        return cycleSum
    }
    fun partTwo(list: List<String>) {
        var initial = 1L
        var counter = 0L
        var cycleSum = 0L
        list.forEach { s ->
            if (s.isNoop()) {
                checkPrint(counter, initial)
                counter += 1L
                if (counter.isCounterCycle()) {
                    cycleSum += initial * counter
                }
                printNew(counter)
            } else if (s.isAddX()) {
                checkPrint(counter, initial)
                counter += 1L
                if (counter.isCounterCycle()) {
                    cycleSum += initial * counter
                }
                printNew(counter)
                checkPrint(counter, initial)
                counter += 1L
                if (counter.isCounterCycle()) {
                    cycleSum += initial * counter
                }
                printNew(counter)
                val v = s.split(" ")[1].toLong()
                initial += v
            } else {
                throw RuntimeException("unknown command")
            }
        }
    }

    private fun String.isNoop(): Boolean {
        return this == "noop"
    }

    private fun String.isAddX() : Boolean {
        return this.substring(0, 4) == "addx"
    }

    private fun Long.isCounterCycle() : Boolean {
        return (this.mod(40)) - 20 == 0
    }

    private fun checkPrint(counter: Long, current: Long) {
        val modValue = counter.mod(40).toLong()
        if (modValue == current || modValue == current -1 || modValue == current + 1) {
            print("#")
        } else {
            print(".")
        }
    }

    private fun printNew(counter: Long) {
        if (counter.mod(40).toLong() == 0L) println("")
    }
}